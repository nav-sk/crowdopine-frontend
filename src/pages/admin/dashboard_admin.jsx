import React, { useContext, useEffect, useState } from "react";
import { request } from "../../utility/utils";
import { AuthContext } from "../../utility/userAuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setLivePolls, setRecentPolls } from "../../redux/actions/pollsDataAction";
import { LoaderDashboardAdmin } from '../../components/loader_dashboard_admin';
import { Doughnut, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useNavigate } from "react-router-dom";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LivePollContent = (props) => {
    const navigate = useNavigate();
    const _liveData = useSelector(state => state.pollsDataReducer.liveData);
    const [liveData, setLiveData] = useState(_liveData);

    useEffect(() => {
        setLiveData(_liveData);
    }, [_liveData]);


    const CountDown = ({ endsBy }) => {
        const [time, setTime] = useState("0:00:00:00");
        let x = setInterval(() => {
            const endTime = new Date(endsBy).getTime();
            const now = new Date().getTime();
            const difference = endTime - now;
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            // Update the HTML with the countdown timer
            setTime(`${days}:${hours}:${minutes}:${seconds}`)
            if (difference <= 0) clearInterval(x);
        }, 1000);

        return <p className="text-5xl text-center opacity-60 font-semibold" style={{ visibility: time === "0:00:00:00" ? "hidden" : "" }}>{time}</p>;
    }
    const livePollItem = (poll, i, arr) => {
        const { votedOnOptions, options, votedTotal, votedTime, createdAt } = poll;
        let maxi = 0;

        const onPollItemClick = e => {
            navigate(`../view/stats/${1}/${i+1}`)
        }
        const chartOptions = {
            // tooltip: {
            //     callbacks: {
            //         label: (t) => {
            //             // const label = d.datasets[t.datasetIndex].label;
            //             // const value = d.datasets[t.datasetIndex].data[t.index];
            //             // return `${new Date(value)+new Date(createdAt)}`
            //             return "Hello"
            //         },
            //         bodyFontColor: "black",
            //         displayColors: false
            //   }  
            // },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            console.log("Hellqeqdw");
                            // var label = data.datasets[tooltipItem.datasetIndex].label || '';
                            var value = tooltipItem.yLabel;
                            // return ' + tooltipItem.dataset[tooltipItem.datasetIndex]';
                            // console.log(tooltipItem.dataset[tooltipItem.datasetIndex]);
                            // console.log(tooltipItem.dataset);
                            console.log(tooltipItem);
                            console.log(new Date(new Date(createdAt).getTime()+Number.parseInt(tooltipItem.dataset.data[tooltipItem.datasetIndex])));
                            return `${new Date(new Date(createdAt).getTime()+Number.parseInt(tooltipItem.dataset.data[tooltipItem.label])+5*60*60*1000+30*60*1000).toLocaleString()}`;
                            // return `${new Date(value)+new Date(createdAt)}`
                        }
                    }
                },
                legend: {
                    align: 'end',
                }
            },
            scales: {
                x: {
                    // display: false
                },
                y: {
                    ticks: {
                        display: false,
                        maxTicksLimit: 10,
                        autoSkip: false
                    }
                }
            }
        }
        const chartData = {
            labels: [...Array(votedTime.length).keys()],
            datasets: [
                {
                    label: "Votings",
                    // data: [votedTime.map((el, i) => { return { x: new Date(el).toISOString(), y: i + 1 } })]
                    data: votedTime.map((el, i) => new Date(el) - new Date(createdAt)),
                    // borderWidth: 1,
                    backgroundColor: "pink",
                    borderColor: "#165baa",
                    pointBackgroundColor: "#f765a3",
                    pointBorderColor: "#f765a3",
                    pointRadius: 5,

                }
            ]
        }
        votedOnOptions.forEach((el, i, arr) => {
            if (arr[maxi] < el) maxi = i;
        });

        return <section className="flex flex-row w-full flex-nowrap mb-5" key={i}>
            <section className="w-5/12 rounded-3xl bg-DBlue px-10 py-5 flex-shrink-0 cursor-pointer" onClick={onPollItemClick}>
                <div className="flex flex-col h-full">
                    <p className="text-4xl text-center pb-3">{poll.title}</p>
                    <div className="w-full h-1 bg-white bg-opacity-30" />
                    <section className="flex flex-row flex-nowrap mt-8 justify-around items-center h-full">
                        <div className="flex flex-col items-center w-1/2">
                            <p className="text-6xl font-semibold">{Number.parseFloat(votedTotal !== 0 ? votedOnOptions[maxi] / votedTotal * 100 : 0).toFixed(1)}%</p>
                            <p className="text-lg pl-2 opacity-40">(Maximum)</p>
                        </div>
                        {/* <p className="opacity-70 text-4xl font-semibold">{ options[maxi]}</p> */}
                        <p className="opacity-70 text-4xl font-semibold w-1/2 whitespace-nowrap overflow-hidden text-ellipsis text-center">{options[maxi]}</p>
                    </section>
                    <div className="w-full flex justify-center my-5">
                        <p className="bg-opacity-30 px-10 py-1 rounded-full text-xl border border-white border-opacity-40 bg-black">Voted:{votedTotal}</p>
                    </div>
                    <div className="w-full h-1 bg-white bg-opacity-30" />
                    <div className="flex flex-col mb-5">
                        <p className="text-2xl mb-2">Due Time:</p>
                        <CountDown endsBy={poll.endsBy} />
                    </div>
                </div>
            </section>

            <section className="w-full h-full pl-5 rounded-3xl">
                <div className="w-full h-full p-5 bg-Sandal rounded-3xl">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </section>
        </section>
    }

    return <div className="w-full flex flex-col items-center">
        {liveData && liveData.count !== 0 && liveData.data.map(livePollItem) || <div className='w-full bg-DBlue rounded-2xl h-56 flex items-center justify-center text-white text-opacity-50 text-2xl'>No Active Polls Available</div>}
    </div>

}


export const DashboardAdmin = () => {
    const user = useContext(AuthContext);
    const dispatch = useDispatch();
    const _liveData = useSelector(state => state.pollsDataReducer.liveData);
    const _recentData = useSelector(state => state.pollsDataReducer.recentData);
    const [liveData, setLiveData] = useState(_liveData);
    const [recentData, setRecentData] = useState(_recentData);


    useEffect(() => {
        if (user && !liveData) {
            request.get("/admin/get/live-polls").then(res => {
                console.log(res.data)
                setLiveData({ ...res.data });
                dispatch(setLivePolls(res.data));
            }).catch(err => {
            })
        }
        if (user && !recentData) {
            request.get("/admin/get/recent-polls").then(res => {
                console.log(res.data)
                setRecentData({ ...res.data });
                dispatch(setRecentPolls(res.data));
            }).catch(err => {

            })
        }
    }, [user]);

    return (
        liveData && recentData ?
            <div className="flex flex-col w-full h-full p-5 overflow-y-auto ">

                {/* <section className="flex flex-row flex-nowrap">
                    <section className="w-5/12 rounded-3xl bg-DBlue px-10 py-5 flex-shrink-0">
                        <div className="flex flex-col h-full">
                            <p className="text-xl font-bold text-center"> X-Name Student</p>
                            <section className="flex flex-row flex-nowrap mt-8 justify-around h-full">
                                <div className="flex flex-col items-center">
                                    <p className="text-5xl font-semibold">50%</p>
                                    <p className="opacity-50">Yes</p>
                                </div>
                                <div className="h-full w-1 rounded-full bg-white bg-opacity-40" />
                                <div className="flex flex-col items-center">
                                    <p className="text-5xl font-semibold">50%</p>
                                    <p className="opacity-50">No</p>
                                </div>
                            </section>
                            <div className="w-full flex justify-center my-5">
                                <p className="bg-opacity-30 px-10 rounded-full text-lg border border-white border-opacity-40 bg-black">Voted:
                                    69%</p>
                            </div>
                            <div className="flex flex-col mb-5">
                                <p className="text-2xl mb-2">Due Time:</p>
                                <p className="text-5xl text-center opacity-60 font-semibold">02:30:36</p>
                            </div>
                        </div>
                    </section>

                    <section className="w-full h-full bg-Sandal ml-5 rounded-3xl">
                    </section>
                </section> */}
                <LivePollContent />
                <section className="w-full rounded-3xl mt-5 h-48 flex items-center justify-center bg-Wood">
                    <p className="opacity-30 text-black text-3xl">No Recent Polls</p>
                    <div className="h-48" />
                </section>
            </div> : <div className="w-full h-full flex items-center justify-center">
                <LoaderDashboardAdmin />
            </div>);
}