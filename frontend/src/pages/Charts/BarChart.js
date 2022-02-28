import React,{useState,useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
//this is for pie
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
//For barchart

const BarChart=()=>{

var KholaId = localStorage.getItem('KholaId');
console.log(`khola id is ${KholaId}`);
const [chart,setChart]=useState([])

var baseUrl=`http://localhost:3001/api/khola/livestock/Report/${KholaId}`
//var proxyUrl='https://cors-anywhere.herokuapp.com/'
var apikey=
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaW5hZmUgY29hc3RlciIsImlkIjozLCJpYXQiOjE2NDUzOTk0MTJ9.UnzI0tr6L1YAwaYsB9F6Oga9wY2Cc3Q5rNwlKXDWClk"
    
useEffect(()=>{
    const fetchUsers=async ()=>{
        try {
            const response = await fetch(`${baseUrl}`, {mode:'cors'});
            const data = await response.json();
            console.log(`data is ${ data }`)
            setChart(data)
          }
          catch (e) {
            console.log(e)
          }
        }

    fetchUsers()
},[baseUrl]) //,apikey
console.log("chart",chart)


var data={
        labels: chart?.list?.map(x => x.Vaccinated),
        datasets: [{
            label: `Total kholas ${chart?.list?.length} `,
            data: chart?.list?.map(x => x.Total),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
    var options={
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        legend:{
            labels:{
                fontSize: 30 
            }
        }
    }
    return (
        <div>
           <Pie
           data={data}
           height={400}
           width={2000}
           options={options}
           />

        </div>
    )

}
export default BarChart


