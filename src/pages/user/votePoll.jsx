import React, { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import '../../styles/votePoll.css';
import { FaDotCircle } from 'react-icons/fa';
import { request } from "../../utility/utils";
import { setLivePolls, setRecentPolls } from "../../redux/actions/pollsDataAction";

const OptionsList = ({ options }) => {
    const [checked, setChecked] = useState(null);
    const Option = ({ option, checked, setChecked, index }) => {
        return <div className="w-full">
            <input type="radio" className="hidden" name="options" id={"option_" + (index + 1)} onChange={e => setChecked(index)} checked={index == checked} value={index + 1} />
            <label className="w-full flex-row flex items-center cursor-pointer" htmlFor={"option_" + (index + 1)}>
                <div className="self-stretch flex justify-center items-center p-2 my-2">
                    <div className={"flex justify-center items-center rounded-full aspect-square mr-2  border-4 border-black " + ((checked === index) ? "bg-black" : "bg-gray-200")}>
                        {!(checked === index) ? <span className="text-2xl font-bold px-2">{String.fromCharCode(65 + index)}</span> : <FaDotCircle className="text-white h-full w-full p-2 self-stretch" />}
                    </div>
                </div>
                <div className="flex-grow py-3 px-4 bg-gradient-to-r from-blue-500 to-orange-500 rounded-xl text-2xl text-center font-semibold border-2 border-black">{option}</div>
            </label>
        </div>
    }

    return <form name="cast_vote_choose_option" className="w-full flex flex-col py-5">
        {options && options.map((opt, i) => <Option option={opt} checked={checked} setChecked={setChecked} index={i} key={i} />)}
    </form>
}

export const VotePoll = (props) => {
    const param = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const _liveData = useSelector(state => state.pollsDataReducer.liveData);
    const [error, setError] = useState("Hello")
    const [{ id, title, statement, options }, setPollData] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [btnText, setBtnText] = useState("Vote");

    useEffect(() => {
        if (_liveData == null) {
            navigate("/home");
        } else {
            setPollData(_liveData.data[Number.parseInt(param.id) - 1]);
        }
        
    })

    const onVoteButtonClick = (e) => {
        setError("Hello")
        setLoading(true)
        let ii = null;
        document.forms['cast_vote_choose_option'].options.forEach((option, index) => {
            if (option.checked) ii = index;
        });

        if (ii !== null) {
            request.post('/cast/vote', { id: id, option: ii + 1, timestamp: new Date().toISOString().replace(/\.\d{3}/, '').replace('Z', '+00:00') }).then(res => {
                console.log("voted");
                console.log(res.data);
                setBtnText("Voted!");
                setError("Returning home in 5 secs..");
                setTimeout(() => {
                    navigate('/home')
                    dispatch(setRecentPolls(null));
                    dispatch(setLivePolls(null));
                }, 5000);
                setLoading(false)
            }).catch(err => {
                console.log(err);
                setLoading(false)
                setError("An error occured");
            })
        }
        else {
            setLoading(false)
            setError("Choose any one option")
        }
    }

    return <div className="w-full h-full bg-gradient-to-tr from-amber-600 to-amber-300 flex justify-center font-barlow overflow-hidden">
        <div className="w-full px-5 md:w-7/12 overflow-auto">
            <div className="w-full my-5 flex flex-col">
                <header className=" text-4xl md:text-6xl font-bold text-center">{title}</header>
                <section className="w-full flex flex-col my-10">
                    <span className="border-2 rounded-full text-lg md:text-xl px-4 w-fit border-black font-semibold">Statement</span>
                    <div className="w-full border-2 border-black rounded-2xl py-8 px-5 md:text-xl font-semibold my-5 text-center bg-gradient-to-r from-pink-300 to-sky-300">
                        {statement}
                    </div>
                </section>
                <section className="w-full flex flex-col">
                    <span className="border-2 rounded-full text-xl px-4 w-fit border-black font-semibold">Options</span>
                    <OptionsList options={options} />
                </section>
                <p className="self-end text-md text-red-700 bg-red-500 rounded-md w-fit bg-opacity-20 px-3" style={{ visibility: "Hello" === error ? "hidden" : "" }}>{error}</p>
                <div className="w-full flex justify-center text-white px-5">
                    <Button variant="solid" backgroundColor="black" className=" my-5 transition-transform hover:scale-105" isDisabled={btnText === "Voted!"} isLoading={isLoading} style={{ color: (btnText === "Vote" ? "white" : "green") }} onClick={onVoteButtonClick} rounded="full" fontSize="2xl" py={8} width="full" _hover={{ backgroundColor: "black", shadow: "0 2px 8px 2px #00000088" }} _disabled={{ backgroundColor: "black" }} _focus={{ backgroundColor: "black" }}>{btnText}</Button>

                </div>
            </div>
        </div>

    </div>
}