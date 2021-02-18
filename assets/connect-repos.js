function loadIndexReposList(options) {
  options = options ? options : {};
  target = options.target ? $(options.target) : null;
  max = options.max && !isNaN(parseInt(options.max+"")) ? parseInt(options.max+"") : 10

  if(target == null) {
    console.error("No valid target for 'loadIndexReposList' content; aborting.")
    return;
  }

  $.ajax({
    url: "https://api.github.com/users/Neotys-Connect/repos",
    dataType: 'json',
    success: function(data){
      repos = data
      repos = repos.filter(repo => repo.name != "connect.neotys.com")
      repos = calculateRepoPopularity(repos)
      repos = sortByKeyDesc(repos,"connect_popularity")
      repos = repos.slice(0, max);
      var lis = repos.map(function(repo) {
        var el = $('<li><a href="' + repo.html_url + '">' + repo.name + '</li>');
        el.attr("title",repo.description)
        return el
      });
      target.empty().append(lis)
      updateOffsiteLinksToOpenInBlank();
      if(options.after) options.after(repos)
    }
  });
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
    console.log(repo.name + ": " + time_perc)
    console.log([pop,stargazers,watchers,forks,open_issues,time_perc])
    repo.connect_popularity = pop
  });

  return repos
}
