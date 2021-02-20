var allRepos = {
  "Neotys-Connect": null,
  "Neotys-Labs": null
}

var intLoadRepos = setInterval(function() {
  if(typeof $ != 'undefined') {
    Object.keys(allRepos).forEach(function(key) {
      if(allRepos[key] == null)
      {
        allRepos[key] = {
          "loaded": false,
          "data": []
        }
        loadRepoAsync("https://api.github.com/users/"+key+"/repos",function(data) {
          allRepos[key]["data"] = data
          allRepos[key]["loaded"] = true
          refreshReposUI()
        });
      }
    })
    if(areAllReposLoaded()) {
      clearInterval(intLoadRepos)
      refreshReposUI()

      checkRepoLoadAfterTriggers()
    }
  }
},100);

function areAllReposLoaded() {
  return (Object.keys(allRepos).every(key => allRepos[key] != null && allRepos[key]["loaded"] == true))
}

function checkRepoLoadAfterTriggers(context) {
  var tobe = [];
  if(typeof context != 'undefined')
    tobe = [ context.options ]
  else if(areAllReposLoaded())
    tobe = __loadReposListOptions

  var alldatas = aggregateCurrentReposDatas()
  tobe.forEach(options => {
    if('after' in options) {
      options.after(alldatas)
    }
  });

  updateOffsiteLinksToOpenInBlank();
}

function aggregateCurrentReposDatas() {
  var alldatas = []
  Object.keys(allRepos)
    .filter(key => allRepos[key] != null && allRepos[key]["loaded"] == true)
    .forEach(key => alldatas = alldatas.concat(allRepos[key]["data"]))
  return alldatas
}

function refreshReposUI() {
  var alldatas = aggregateCurrentReposDatas()

  __loadReposListOptions.forEach(options => {
    options.target.empty()
    processReposData(options,alldatas);
  });
}

function getReposCache() { return caches.open('connect-repos'); }

function loadRepoAsync(url, __callback) {
  try {
    if('caches' in window) {
      console.log('cache capable')

      var fMakeCallThenCacheAndCallback = function(cache) {
        console.log("Retrieving " + url)
        $.ajax({
          url: url,
          dataType: 'json',
          crossDomain: true,
          headers: {
            'Accept': '*/*'
          },
          success: function(data, status, xhr){
            var resp = new Response(JSON.stringify(data))
            xhr.getAllResponseHeaders().split("\r\n").map(s => {
              var parts = s.split(":");
              var ret = { name: parts[0] }
              ret.value = parts.length > 1 ? parts.slice(1,parts.length).join(":") : null
              return ret
            }).filter(h => h.value != null).forEach(h => {
              resp.headers.append(h.name,h.value);
            });
            resp.headers.append('date',(new Date()));
            // console.log(resp)
            cache.put(url, resp)
            __callback(data)
          }
        });
      }

      getReposCache().then((cache) => {
        cache.match(url).then((response) => {
          if(!response) {
            fMakeCallThenCacheAndCallback(cache)
          } else {
            var isTooOld = true;
            // console.log(response.headers.has('date'))
            if(response.headers.has('date')) {
              var responseDate = Date.parse(response.headers.get('date'))
              var ageInMinutes = ((((new Date()) - responseDate) / (1000 * 60)))
              var remainingCallsPerHr = !response.headers.has('x-ratelimit-remaining') ? 1 : parseInt(response.headers.get('x-ratelimit-remaining'))
              var optimalAge = 60 / remainingCallsPerHr
              console.log({
                'responseDate':responseDate,
                'ageInMinutes':ageInMinutes,
                'remainingCallsPerHr':remainingCallsPerHr,
                'optimalAge':optimalAge
              })
              isTooOld = ageInMinutes > optimalAge
            }
            if(isTooOld) {
              console.log("Expiring and refreshing cached response for " + url)
              cache.delete(url).then(() => {
                fMakeCallThenCacheAndCallback(cache)
              });
            } else {
              // console.log("Using cached response for " + url)
              response.json().then((data) => {
                __callback(data)
              });
            }
          }
        });
      });

    } else {
      $.ajax({
        url: url,
        dataType: 'json',
        success: function(data){
          __callback(data)
        }
      });
    }
  } catch(ex) {
    console.error(ex)
    __callback([])
  }
}

function processReposData(options, data) {
  var target = options.target
  var repos = data

  repos = repos.filter(repo => repo.name != "connect.neotys.com")
  if(options.filter)
    repos = repos.filter(options.filter)

  repos = calculateRepoPopularity(repos)
  repos = sortByKeyDesc(repos,"connect_popularity")

  if(options.max) repos = repos.slice(0, max);

  var lis = repos.map(function(repo) {
    var el = $('<li><a href="' + repo.html_url + '">' + repo.name + '</li>');
    var title = [
      repo.description,
      '',
      'Stars: ' + repo.stargazers_count,
      'Watches: ' + repo.watchers_count,
      'Open Issues: ' + repo.open_issues_count,
      'Forks: ' + repo.forks_count,
      'Updated: ' + (new Date(repo.updated_at)).toLocaleString()
    ].join('\n')

    el.attr("title",title)
    return el
  });
  target.append(lis)
}

var __loadReposListOptions = []
function loadReposList(options) {
  options = options ? options : {};
  target = options.target ? $(options.target) : null;
  max = options.max && !isNaN(parseInt(options.max+"")) ? parseInt(options.max+"") : 10

  if(target == null) {
    console.error("No valid target for 'loadReposList' content; aborting.")
    return;
  }
  options.target = target
  options.max = max

  __loadReposListOptions.push(options)

  refreshReposUI()
}

function sortByKeyDesc(array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }
function sortByKeyAsc(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
function calculateRepoPopularity(repos) {
  var maxes = {}
  var mins = {}
  var max_fields = ['stargazers_count','watchers_count','forks_count','open_issues_count','updated_at']
  $(max_fields).each(function(i) {
    var field = max_fields[i]
    maxes[field] = 0;
    mins[field] = 0;
  });
  var base_date = new Date('2020-01-01T00:00:00')
  maxes['updated_at'] = base_date;
  mins['updated_at'] = base_date;
  $(repos).each(function(i) {
    repo = repos[i]
    $(max_fields).each(function(i) {
      var field = max_fields[i]
      var the_max = maxes[field];
      var the_min = mins[field];
      var this_val = repo[field];
      if(the_max.getTime) this_val = new Date(this_val);
      if(this_val > the_max || (the_max.getTime && this_val.getTime() > the_max.getTime()))
        maxes[field] = this_val;
      if(this_val < the_min || (the_min.getTime && this_val.getTime() < the_min.getTime()))
        mins[field] = this_val;
    });
    repo.connect_popularity = 0
  });

  $(repos).each(function(i) {
    repo = repos[i]
    var stargazers = repo['stargazers_count'] / Math.min(1, maxes['stargazers_count']);
    var watchers = repo['watchers_count'] / Math.min(1, maxes['watchers_count']);
    var forks = repo['forks_count'] / Math.min(1, maxes['forks_count']);
    var open_issues = repo['open_issues_count'] / Math.min(1, maxes['open_issues_count']);
    var time = (new Date(repo['updated_at'])).getTime()
    var min_time = mins['updated_at'].getTime()
    var max_time = maxes['updated_at'].getTime()
    var time_perc = (time - min_time) / (max_time - min_time)

    var pop = (0.001 * stargazers) + (0.001 * watchers) + (0.002 * forks) + (0.001 * open_issues) + (0.995 * time_perc)
    repo.connect_popularity = pop
  });

  return repos
}

/*
For anyone reading this, the premise of a lazy-loading component that uses a public
 API that rate-limits and therefore drives developers to cache on the front end...
 ...just consider it an easter egg for load testers...how would you test this in
 protocol-based scripts? I have my ideas, but I welcome yours: twitter.com/paulsbruce
*/
