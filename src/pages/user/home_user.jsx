import { React, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setUserData } from '../../redux/actions/userProfileAction';
import { AuthContext } from '../../utility/userAuthContext';
import { request } from '../../utility/utils';
import { LoaderHomeUser } from "../../components/loader_home_user";
import { setLivePolls, setRecentPolls } from "../../redux/actions/pollsDataAction";
import { Button } from '@chakra-ui/react';
import '../../styles/index.css';
import { logout } from '../../firebase/auth';



const LivePollDisplay = () => {
    const navigate = useNavigate();
    const _liveData = useSelector(state => state.pollsDataReducer.liveData);
    const [liveData, setLiveData] = useState(_liveData);

    useEffect(() => {
        setLiveData(_liveData);
        console.log(liveData);
    }, [_liveData]);

    const CountDown = ({ endsBy }) => {
        const [time, setTime] = useState("-1");
        useEffect(() => {
            const x = setInterval(() => {
                const endTime = new Date(endsBy).getTime();
                const now = new Date().getTime();
                const difference = endTime - now;
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                // Update the HTML with the countdown timer
                if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
                    setTime("0:00:00:00");
                    window.location.reload();
                } else {
                    setTime(`${days}:${hours}:${minutes}:${seconds}`)
                }
                if (difference <= 0) {
                    clearInterval(x);
                    console.log(x);
                };
            }, 1000);
            console.log("qew");

            return () => clearInterval(x);
        });

        return <p className="text-6xl text-center opacity-60 font-semibold py-5" style={{ visibility: time === "-1" ? "hidden" : "" }}>{time}</p>;
    }


    const PollItem = ({ title, createdBy, votedTotal, endsBy }, index) => {
        const onCastVoteClick = e => {
            navigate('../vote/' + (index + 1));
        }
        return <div className='flex flex-col w-full px-2 py-5' key={index}>
            <div className='w-full p-5 bg-DBlue text-white rounded-2xl relative group'>
                <div className='flex flex-col '>
                    <span className='self-end bg-green-500 font-semibold px-3 rounded-full text-black'>Active</span>
                    <p className='text-5xl font-semibold text-center pb-5 pt-3'>{title}</p>
                    <div className='w-full h-0.5 bg-white bg-opacity-30' />
                    <div className='flex flex-row py-4 justify-around'>
                        <div className='flex w-1/2 flex-col items-center'>
                            <span className='bg-white text-lg font-semibold px-4 rounded-full bg-opacity-20 opacity-60 border-2'>Posted By</span>
                            <p className='text-center font-semibold text-3xl pt-5'>{createdBy}</p>
                        </div>
                        <div className=' w-0.5 bg-white bg-opacity-30' />
                        <div className='flex w-1/2 flex-col items-center'>
                            <span className='bg-white text-lg font-semibold px-4 rounded-full bg-opacity-20 opacity-60 border-2'>Total Votes</span>
                            <div className='flex flex-col pt-4'>
                                <p className='text-5xl font-bold opacity-90 pr-10'>{votedTotal}</p>
                                <p className='text-lg self-end opacity-70'>Votes</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-0.5 bg-white bg-opacity-30' />
                    <p className='text-center underline-offset-4 underline opacity-80 pt-5'>Duration Time</p>
                    <CountDown endsBy={endsBy} />
                    <div className='opacity-0 group-hover:opacity-100 w-full h-full bg-black z-10 top-0 left-0 absolute rounded-2xl bg-opacity-40 flex items-center justify-center transition-opacity'>
                        <Button variant="outline" className='animate-bounce' rounded="full" size="lg" onClick={onCastVoteClick}>Cast Vote</Button>
                    </div>
                </div>
            </div>
        </div>
    }

    return <div className='w-5/12 flex flex-col items-center flex-shrink-0 overflow-auto pr-3'>
        <p className='text-center text-4xl py-3 font-bold'>Live Polls</p>
        {liveData && liveData.count !== 0 && liveData.data.map(PollItem) || <div className='w-full bg-DBlue rounded-2xl h-56 flex items-center justify-center text-white text-opacity-50 text-2xl'>No Active Polls Available</div>}
    </div>
}


const RecentPollDisplay = props => {
    const _recentData = useSelector(state => state.pollsDataReducer.recentData);

    useEffect(() => {
        console.log(_recentData);
    }, [_recentData])

    const PollItem = ({ data }) => {
        console.log(data);
        return <div className="w-full bg-Wood p-3 my-2 rounded-lg">
            <div className='w-full px-5 flex flex-row items-center justify-between'>
                <p className='text-2xl font-semibold w-fit'>{data.statement}</p>
                <p className='italic'>{new Date(data.endsBy)-new Date().getTime() >0?"Active":"Expired"}</p>

            </div>
            <div className='h-0.5 bg-Sandal bg-opacity-50 rounded-full my-3' />
            <div className='w-full flex justify-between px-5 text-xl flex-row text-green-700'>
                <p>{data.maxVote.option}</p>
                <span className='flex flex-row'>
                    <p>{Number.parseFloat(data.maxVote.count / data.votedTotal * 100).toFixed(2)}%</p>
                    <p className="text-xs self-end pl-1">(max)</p>
                </span>
            </div>
            <div className='w-full h-0.5 rounded-full bg-Sandal bg-opacity-50 my-3' />
            <div className='w-full flex justify-between px-5 text-xl flex-row text-red-700'>
                <p>{data.minVote.option}</p>
                <span className='flex flex-row'>
                    <p>{Number.parseFloat(data.minVote.count / data.votedTotal * 100).toFixed(2)}%</p>
                    <p className="text-xs self-end pl-1">(min)</p>
                </span>
            </div>
            <div className='w-full flex justify-end'>
                <p className='text-right mt-5 italic text-Sandal font-semibold text-opacity-70 border-t border-opacity-40 border-Sandal w-fit'>Posted by: {data.createdBy}</p>
            </div>
        </div>

    }

    return <div className='w-full h-full py-5 pl-1 rounded-xl mx-2 overflow-auto'>
        <p className='text-center text-4xl font-bold'>Recent Polls</p>
        {_recentData && _recentData.count!==0 && _recentData.data.map((el, i) => <PollItem data={el} key={i} />) || <div className='w-full bg-Wood rounded-2xl h-56 flex items-center justify-center my-6 text-white text-opacity-50 text-2xl'>No Recent Polls Available</div>}
    </div>
}


export const HomeUser = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useContext(AuthContext);

    const userData = useSelector(state => state.userProfileReducer.user);
    const _liveData = useSelector(state => state.pollsDataReducer.liveData);
    const _recentData = useSelector(state => state.pollsDataReducer.recentData);
    const [liveData, setLiveData] = useState(_liveData);
    const [recentData, setRecentData] = useState(_recentData);
    const [{ name, regNo, email, dept, batch, section }, setUser] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            request.get('authenticate/user').then(res => {
                if (res.data.user === 'non_user') {
                    navigate('/login');
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }, [user])
    useEffect(() => {
        if (user && !liveData && !recentData) {
            request.get("get/user/polls").then(res => {
                console.log(res.data)
                setLiveData({ ...res.data.livePolls });
                setRecentData({ ...res.data.recentPolls })
                dispatch(setLivePolls(res.data.livePolls));
                dispatch(setRecentPolls(res.data.recentPolls));
                console.log("called here 120");
            }).catch(err => {
            })
        }
    }, [user]);
    useEffect(() => {
        if (user && liveData && recentData) {
            setLoading(false);
        }
    })

    useEffect(() => {
        if (user && !name) {
            request.get('get/user-data').then(res => {
                dispatch(setUserData(res.data));
                setUser(res.data);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [user])

    const onClickLogout = props => {
        logout();

    }

    return <div className="w-full h-full bg-DBlue flex items-center justify-between">
        {loading ? <div className='w-full'><LoaderHomeUser /></div> : <div className="w-full h-full flex flex-col">
            <header className="w-full bg-DBlue py-4 text-white px-6">
                <div className="w-full flex flex-row items-center justify-between">
                    <h1 className="text-3xl font-semibold ">CrowdOpine</h1>
                    <div className='flex flex-col items-end'>
                        <div className='flex flex-row'>
                            <p className='px-1 font-semibold'>{name}</p>
                            <p className='px-1'>{regNo}</p>
                            <p className='px-1'>{dept}</p>
                        </div>
                        <p className='italic pl-3 cursor-pointer' onClick={onClickLogout}>Logout</p>
                    </div>
                </div>
            </header>
            <section className='h-full w-full flex flex-row bg-Sandal rounded-t-2xl px-5 shadow-xl overflow-hidden'>
                <LivePollDisplay />
                <div className='w-0.5 bg-Wood bg-opacity-50 my-5'/>
                <RecentPollDisplay />
            </section>
        </div>}
    </div>
}