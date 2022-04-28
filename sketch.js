//Data Jenis Kelamin//

// atur dimensi dan margin grafik
var margin = {top: 10, right: 30, bottom: 100, left: 40},
    width = 1000 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// tambahkan objek svg ke badan halaman
var svg1 = d3.select("#jk")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// input data
d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTyLLGBs3PHjiXh2BCxT8RhPLjBBPqBSgiUDkr-J3LFtHwu8Y-WVSkY-4WJP-eNtC0Q2leMF6drkNLp/pub?gid=0&single=true&output=csv", function(data) {


  // Sumbu X: skala dan gambar
  var x = d3.scaleBand()
      .domain(data.map(function(d){return d.JenisKelamin; }))     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width])
      .padding(0.4);

  svg1.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
      
 

  //Sumbu Y: skala dan gambar
  var y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(data.map(function(d){return d.Jumlah}))]);   // elemen d3 dipanggil sebelum ke sumbu y yang jelas
  svg1.append("g")
      .call(d3.axisLeft(y));

  // tambahkan bar persegi panjang ke elemen svg
  svg1.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d){return x(d.JenisKelamin)})
      .attr("y", function(d){return y(d.Jumlah)})
        
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Jumlah); })
        .style("fill", "rgb(214, 14, 14)") 

});

//Akhir Data Jenis Kelamin//

//Awal Data Usia Penduduk//
var svg2 = d3.select("#UsiaPenduduk")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTyLLGBs3PHjiXh2BCxT8RhPLjBBPqBSgiUDkr-J3LFtHwu8Y-WVSkY-4WJP-eNtC0Q2leMF6drkNLp/pub?gid=439772999&single=true&output=csv", function(data) {


 
  var x = d3.scaleBand()
      .domain(data.map(function(d){return d.Usia; }))    
      .range([0, width])
      .padding(0.2);

  svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
      
  

  
  var y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(data.map(function(d){return d.Jumlah}))]);   
  svg2.append("g")
      .call(d3.axisLeft(y));


  svg2.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d){return x(d.Usia)})
      .attr("y", function(d){return y(d.Jumlah)})
        
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Jumlah); })
        .style("fill", "rgb(223, 223, 15)") 

});
//Akhir Data Usia Penduduk//

//Data Awal Pendidikan Penduduk//
stockData();
async function stockData(){
  const urlPend = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpfyXYQo7-n5IwnCBACuXyapLDKiOAL6nRcw9blUCPhYEQ9dRjhPkZdzlZQamDasPDhZg9aF417OAD/pub?gid=1054801099&single=true&output=csv";
  const responsePend = await fetch(urlPend);
  //wait for the request to be completed
  const tabledataPend = await responsePend.text();
  const tablePend = tabledataPend.split('\n').slice(0)
  const datapointsPend = [];
  const labelsPend = [];
tablePend.forEach(row =>{
  const column = row.split (',');
const Pendidikan = column [0];
const Jumlah = column [1];
labelsPend.push(Pendidikan);
datapointsPend.push(Jumlah);
})

labelsPend.shift();
datapointsPend.shift();
 
myChart.config.data.labels = labelsPend;
myChart.config.data.datasets[0].data = datapointsPend;
myChart.update();
};

const data = {
  labels: [],
  datasets: [{
    label: 'Pendidikan',
    data: [],
    backgroundColor: [
      'rgba(255, 26, 104, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(0, 0, 0, 1)'
    ],
    borderColor: [
      'rgba(255, 26, 104, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1
  }]
};

// config 
const config = {
  type: 'pie',
  data,
  options: {
    plugins:{
    legend: {
      display : false
    }
  }
  }
};


// render init block
const myChart = new Chart(
  document.getElementById('PendidikanPenduduk'),
  config
);
//Data Akhir Pendidikan

//Data Awal Pekerjaan
var svg3 = d3.select("#PekerjaanPenduduk")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTyLLGBs3PHjiXh2BCxT8RhPLjBBPqBSgiUDkr-J3LFtHwu8Y-WVSkY-4WJP-eNtC0Q2leMF6drkNLp/pub?gid=1313959464&single=true&output=csv", function(data) {


 
  var x = d3.scaleBand()
      .domain(data.map(function(d){return d.Pekerjaan; }))    
      .range([0, width])
      .padding(0.4);

  svg3.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10, 0)rotate(-45)")
      .style("text-anchor","end");
      
  

  var y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(data.map(function(d){return d.Jumlah}))]);   
  svg3.append("g")
      .call(d3.axisLeft(y));


  svg3.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d){return x(d.Pekerjaan)})
      .attr("y", function(d){return y(d.Jumlah)})
        
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Jumlah); })
        .style("fill", "rgb(223, 223, 15)") 

});
//Data Akhir Pekerjaan


//Data Awal Penganut Agama
var svg4 = d3.select("#PenganutAgama")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTyLLGBs3PHjiXh2BCxT8RhPLjBBPqBSgiUDkr-J3LFtHwu8Y-WVSkY-4WJP-eNtC0Q2leMF6drkNLp/pub?gid=1521112509&single=true&output=csv", function(data) {


 
  var x = d3.scaleBand()
      .domain(data.map(function(d){return d.Agama; }))    
      .range([0, width])
      .padding(0.2);

  svg4.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
      
  

  
  var y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(data.map(function(d){return d.Jumlah}))]);   
  svg4.append("g")
      .call(d3.axisLeft(y));


  svg4.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d){return x(d.Agama)})
      .attr("y", function(d){return y(d.Jumlah)})
        
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Jumlah); })
        .style("fill", "rgb(223, 223, 15)") 

});
//Data Akhir Penganut Agama


//Data Awal Kepadatan
var svg5 = d3.select("#KepadatanPenduduk")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTyLLGBs3PHjiXh2BCxT8RhPLjBBPqBSgiUDkr-J3LFtHwu8Y-WVSkY-4WJP-eNtC0Q2leMF6drkNLp/pub?gid=1928021891&single=true&output=csv", function(data) {


 
  var x = d3.scaleBand()
      .domain(data.map(function(d){return d.Kepadatan; }))    
      .range([0, width])
      .padding(0.2);

  svg5.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
      
  

  
  var y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(data.map(function(d){return d.JumlahKepadatan}))]);   
  svg5.append("g")
      .call(d3.axisLeft(y));


  svg5.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d){return x(d.Kepadatan)})
      .attr("y", function(d){return y(d.JumlahKepadatan)})
        
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.JumlahKepadatan); })
        .style("fill", "rgb(223, 223, 15)") 

});
//Data Akhir Kepadatan