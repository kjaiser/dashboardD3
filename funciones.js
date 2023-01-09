
var topData = (data, n)=>{
    var top = data.map(d => d.income).sort(function(a, b) {
        return d3.descending(+a.Impressions, +b.Impressions);
        }).slice(0, n);
    console.log(top);
    return top;
}

var getAños = (data)=>{
    var años = new Set(data.map(d => d.year));
    console.log(años);
    return años;
}
const optionChanged = (option) => {
    parameter = option;
    render()
  };

const añoChanged = (option) => {
  añoSelect = +option;
  render(añoSelect)
};

