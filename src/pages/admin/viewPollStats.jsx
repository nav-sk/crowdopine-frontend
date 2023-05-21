
import { IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import autocolors from 'chartjs-plugin-autocolors';

ChartJS.register(ArcElement, Tooltip, Legend, autocolors);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title,);

export const ViewPollStats = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const user = useContext();
    // const { title} = props;
    // const { title, statement, options, votedOnOptions, votedTotal, votedIndividual } = {
    //     "title": "Exam Date",
    //     "statement": "When will the exam be conducted?",
    //     "options": [
    //         "April",
    //         "May",
    //         "June",
    //         "July"
    //     ],
    //     "optionsCount": 4,
    //     "endsBy": "2023-03-08T11:09:16Z",
    //     "createdAt": "2023-02-28T11:09:31.377000Z",
    //     "context": {
    //         "2019": {
    //             "CSE": {
    //                 "A": false,
    //                 "B": false,
    //                 "C": false
    //             },
    //             "AIDS": {},
    //             "MECH": {
    //                 "A": false,
    //                 "B": false
    //             },
    //             "ECE": {
    //                 "A": false,
    //                 "B": false
    //             },
    //             "IT": {
    //                 "A": false
    //             },
    //             "CSBS": {},
    //             "EEE": {
    //                 "A": false
    //             },
    //             "MCT": {
    //                 "A": false
    //             },
    //             "BME": {
    //                 "A": false
    //             },
    //             "CIVIL": {
    //                 "A": false
    //             },
    //             "CSE CS": {},
    //             "AIML": {}
    //         },
    //         "2020": {
    //             "CSE": {
    //                 "A": false,
    //                 "B": false,
    //                 "C": false
    //             },
    //             "AIDS": {
    //                 "A": false,
    //                 "B": false
    //             },
    //             "MECH": {
    //                 "A": false,
    //                 "B": false
    //             },
    //             "ECE": {
    //                 "A": false,
    //                 "B": false
    //             },
    //             "IT": {
    //                 "A": false
    //             },
    //             "CSBS": {
    //                 "A": false
    //             },
    //             "EEE": {
    //                 "A": false
    //             },
    //             "MCT": {
    //                 "A": false
    //             },
    //             "BME": {
    //                 "A": false
    //             },
    //             "CIVIL": {
    //                 "A": false
    //             },
    //             "CSE CS": {},
    //             "AIML": {}
    //         },
    //         "2021": {
    //             "CSE": {
    //                 "A": true,
    //                 "B": true,
    //                 "C": true
    //             },
    //             "AIDS": {
    //                 "A": true,
    //                 "B": true
    //             },
    //             "MECH": {
    //                 "A": true,
    //                 "B": true
    //             },
    //             "ECE": {
    //                 "A": true,
    //                 "B": true
    //             },
    //             "IT": {
    //                 "A": false
    //             },
    //             "CSBS": {
    //                 "A": false
    //             },
    //             "EEE": {
    //                 "A": false
    //             },
    //             "MCT": {
    //                 "A": false
    //             },
    //             "BME": {
    //                 "A": false
    //             },
    //             "CIVIL": {
    //                 "A": false
    //             },
    //             "CSE CS": {},
    //             "AIML": {}
    //         },
    //         "2022": {
    //             "CSE": {
    //                 "A": false,
    //                 "B": false,
    //                 "C": false
    //             },
    //             "AIDS": {
    //                 "A": false,
    //                 "B": false
    //             },
    //             "MECH": {
    //                 "A": false,
    //                 "B": false
    //             },
    //             "ECE": {
    //                 "A": false,
    //                 "B": false
    //             },
    //             "IT": {
    //                 "A": false,
    //                 "B": false
    //             },
    //             "CSBS": {
    //                 "A": false
    //             },
    //             "EEE": {
    //                 "A": false
    //             },
    //             "MCT": {
    //                 "A": false
    //             },
    //             "BME": {
    //                 "A": false
    //             },
    //             "CIVIL": {
    //                 "A": false
    //             },
    //             "CSE CS": {
    //                 "A": false
    //             },
    //             "AIML": {
    //                 "A": false
    //             }
    //         }
    //     },
    //     "votedTotal": 23,
    //     "votedIndividual": [
    //         {
    //             "2019": {
    //                 "CSE": {
    //                     "A": null,
    //                     "B": null,
    //                     "C": null
    //                 },
    //                 "AIDS": {},
    //                 "MECH": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "ECE": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "IT": {
    //                     "A": null
    //                 },
    //                 "CSBS": {},
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {},
    //                 "AIML": {}
    //             },
    //             "2020": {
    //                 "CSE": {
    //                     "A": null,
    //                     "B": null,
    //                     "C": null
    //                 },
    //                 "AIDS": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "MECH": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "ECE": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "IT": {
    //                     "A": null
    //                 },
    //                 "CSBS": {
    //                     "A": null
    //                 },
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {},
    //                 "AIML": {}
    //             },
    //             "2021": {
    //                 "CSE": {
    //                     "A": 0,
    //                     "B": 15,
    //                     "C": 0
    //                 },
    //                 "AIDS": {
    //                     "A": 0,
    //                     "B": 0
    //                 },
    //                 "MECH": {
    //                     "A": 0,
    //                     "B": 0
    //                 },
    //                 "ECE": {
    //                     "A": 0,
    //                     "B": 0
    //                 },
    //                 "IT": {
    //                     "A": null
    //                 },
    //                 "CSBS": {
    //                     "A": null
    //                 },
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {},
    //                 "AIML": {}
    //             },
    //             "2022": {
    //                 "CSE": {
    //                     "A": null,
    //                     "B": null,
    //                     "C": null
    //                 },
    //                 "AIDS": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "MECH": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "ECE": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "IT": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "CSBS": {
    //                     "A": null
    //                 },
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {
    //                     "A": null
    //                 },
    //                 "AIML": {
    //                     "A": null
    //                 }
    //             }
    //         },
    //         {
    //             "2019": {
    //                 "CSE": {
    //                     "A": null,
    //                     "B": null,
    //                     "C": null
    //                 },
    //                 "AIDS": {},
    //                 "MECH": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "ECE": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "IT": {
    //                     "A": null
    //                 },
    //                 "CSBS": {},
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {},
    //                 "AIML": {}
    //             },
    //             "2020": {
    //                 "CSE": {
    //                     "A": null,
    //                     "B": null,
    //                     "C": null
    //                 },
    //                 "AIDS": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "MECH": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "ECE": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "IT": {
    //                     "A": null
    //                 },
    //                 "CSBS": {
    //                     "A": null
    //                 },
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {},
    //                 "AIML": {}
    //             },
    //             "2021": {
    //                 "CSE": {
    //                     "A": 0,
    //                     "B": 5,
    //                     "C": 0
    //                 },
    //                 "AIDS": {
    //                     "A": 0,
    //                     "B": 0
    //                 },
    //                 "MECH": {
    //                     "A": 0,
    //                     "B": 0
    //                 },
    //                 "ECE": {
    //                     "A": 0,
    //                     "B": 0
    //                 },
    //                 "IT": {
    //                     "A": null
    //                 },
    //                 "CSBS": {
    //                     "A": null
    //                 },
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {},
    //                 "AIML": {}
    //             },
    //             "2022": {
    //                 "CSE": {
    //                     "A": null,
    //                     "B": null,
    //                     "C": null
    //                 },
    //                 "AIDS": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "MECH": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "ECE": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "IT": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "CSBS": {
    //                     "A": null
    //                 },
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {
    //                     "A": null
    //                 },
    //                 "AIML": {
    //                     "A": null
    //                 }
    //             }
    //         },
    //         {
    //             "2019": {
    //                 "CSE": {
    //                     "A": null,
    //                     "B": null,
    //                     "C": null
    //                 },
    //                 "AIDS": {},
    //                 "MECH": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "ECE": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "IT": {
    //                     "A": null
    //                 },
    //                 "CSBS": {},
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {},
    //                 "AIML": {}
    //             },
    //             "2020": {
    //                 "CSE": {
    //                     "A": null,
    //                     "B": null,
    //                     "C": null
    //                 },
    //                 "AIDS": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "MECH": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "ECE": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "IT": {
    //                     "A": null
    //                 },
    //                 "CSBS": {
    //                     "A": null
    //                 },
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {},
    //                 "AIML": {}
    //             },
    //             "2021": {
    //                 "CSE": {
    //                     "A": 0,
    //                     "B": 3,
    //                     "C": 0
    //                 },
    //                 "AIDS": {
    //                     "A": 0,
    //                     "B": 0
    //                 },
    //                 "MECH": {
    //                     "A": 0,
    //                     "B": 0
    //                 },
    //                 "ECE": {
    //                     "A": 0,
    //                     "B": 0
    //                 },
    //                 "IT": {
    //                     "A": null
    //                 },
    //                 "CSBS": {
    //                     "A": null
    //                 },
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {},
    //                 "AIML": {}
    //             },
    //             "2022": {
    //                 "CSE": {
    //                     "A": null,
    //                     "B": null,
    //                     "C": null
    //                 },
    //                 "AIDS": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "MECH": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "ECE": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "IT": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "CSBS": {
    //                     "A": null
    //                 },
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {
    //                     "A": null
    //                 },
    //                 "AIML": {
    //                     "A": null
    //                 }
    //             }
    //         },
    //         {
    //             "2019": {
    //                 "CSE": {
    //                     "A": null,
    //                     "B": null,
    //                     "C": null
    //                 },
    //                 "AIDS": {},
    //                 "MECH": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "ECE": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "IT": {
    //                     "A": null
    //                 },
    //                 "CSBS": {},
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {},
    //                 "AIML": {}
    //             },
    //             "2020": {
    //                 "CSE": {
    //                     "A": null,
    //                     "B": null,
    //                     "C": null
    //                 },
    //                 "AIDS": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "MECH": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "ECE": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "IT": {
    //                     "A": null
    //                 },
    //                 "CSBS": {
    //                     "A": null
    //                 },
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {},
    //                 "AIML": {}
    //             },
    //             "2021": {
    //                 "CSE": {
    //                     "A": 0,
    //                     "B": 0,
    //                     "C": 0
    //                 },
    //                 "AIDS": {
    //                     "A": 0,
    //                     "B": 0
    //                 },
    //                 "MECH": {
    //                     "A": 0,
    //                     "B": 0
    //                 },
    //                 "ECE": {
    //                     "A": 0,
    //                     "B": 0
    //                 },
    //                 "IT": {
    //                     "A": null
    //                 },
    //                 "CSBS": {
    //                     "A": null
    //                 },
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {},
    //                 "AIML": {}
    //             },
    //             "2022": {
    //                 "CSE": {
    //                     "A": null,
    //                     "B": null,
    //                     "C": null
    //                 },
    //                 "AIDS": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "MECH": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "ECE": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "IT": {
    //                     "A": null,
    //                     "B": null
    //                 },
    //                 "CSBS": {
    //                     "A": null
    //                 },
    //                 "EEE": {
    //                     "A": null
    //                 },
    //                 "MCT": {
    //                     "A": null
    //                 },
    //                 "BME": {
    //                     "A": null
    //                 },
    //                 "CIVIL": {
    //                     "A": null
    //                 },
    //                 "CSE CS": {
    //                     "A": null
    //                 },
    //                 "AIML": {
    //                     "A": null
    //                 }
    //             }
    //         }
    //     ],
    //     "votedOnOptions": [
    //         7,
    //         5,
    //         3,
    //         8
    //     ],
    //     "votedTime": [
    //         "2023-03-01T08:44:32.449000",
    //         "2023-03-01T08:50:05.292000",
    //         "2023-03-01T08:53:23.974000",
    //         "2023-03-01T08:56:13.021000",
    //         "2023-03-01T08:56:48.377000",
    //         "2023-03-01T08:57:18.293000",
    //         "2023-03-01T08:58:14.757000",
    //         "2023-03-01T09:02:18.635000",
    //         "2023-03-01T09:02:53.851000",
    //         "2023-03-01T09:03:16.996000",
    //         "2023-03-01T09:03:19.132000",
    //         "2023-03-01T09:03:20.021000",
    //         "2023-03-01T09:03:20.956000",
    //         "2023-03-01T09:03:20.459000",
    //         "2023-03-01T09:03:21.164000",
    //         "2023-03-01T11:19:24.763000",
    //         "2023-03-01T11:22:46.288000",
    //         "2023-03-01T11:22:49.509000",
    //         "2023-03-01T11:35:50.921000",
    //         "2023-03-01T11:36:10.124000",
    //         "2023-03-01T11:40:09.122000",
    //         "2023-03-01T11:45:03.649000",
    //         "2023-03-02T09:22:25.335000"
    //     ]
    // }

    console.log(params);
    const _liveData = useSelector(state => state.pollsDataReducer.liveData);
    const _recentData = useSelector(state => state.pollsDataReducer.recentData);
    const [loading, setLoading] = useState(true);
    const [{ title, statement, options, votedOnOptions, votedTotal, votedIndividual }, setData] = useState({});
    useEffect(() => {
        if (params.category === '1') {
            if (_liveData === null) {
                console.log(_liveData);
                navigate("/admin/dashboard")
            } else {
                setData(_liveData.data[Number.parseInt(params.id) - 1]);
            }
        } else if (params.category === '2') {
            if (_recentData === null) {
                navigate("/admin/dashboard");
            } else {
                setData(_recentData.data[Number.parseInt(params.id) - 1]);
            }
        } else {
            navigate("/admin/dashboard");
        }
    }, [_liveData, _recentData]);

    useEffect(() => {

    })

    const Option = props => {
        return <div className="w-full">
            <div className="w-full bg-DBlue rounded-md py-5 px-5 my-5 flex flex-row justify-between items-center">
                <p className="text-lg pr-2">{props.option}</p>
                <span className="w-fit">{Number.parseFloat(props.votedOnOptions[props.i] / props.votedTotal * 100).toFixed(2)}%</span>
            </div>
        </div>
    }

    return <div className="w-full h-full p-5 bg-Sandal overflow-scroll">
        <header className="text-5xl pb-5 pl-5 font-bold text-[#36393b]">{title}</header>
        <div className="flex flex-row flex-nowrap h-5/6">
            <section className="w-6/12 py-5 self-stretch">
                <div className="w-full h-full flex flex-col bg-gray-300 rounded-2xl shadow-md shadow-gray-400 overflow-hidden">
                    <div className="w-full px-5 py-6 pt-6 h-full overflow-auto">
                        <span className="text-black font-semibold border border-black px-2 rounded-full ">Statement</span>
                        <p className="text-center font-semibold text-2xl bg-DBlue py-10 px-2 rounded-lg mt-2 mb-8 shadow-md">{statement}</p>
                        <span className="text-black font-semibold border border-black px-2 rounded-full">Options</span>
                        <div className="w-full overflow-hidden">
                            {options && options.map((el, i) => <Option option={el} votedTotal={votedTotal} votedOnOptions={votedOnOptions} i={i} key={i} />)}
                        </div>
                    </div>
                    <div className="w-full ">
                        <p className="text-center font-semibold text-black text-2xl py-5">Total Votes: {votedTotal}</p>
                    </div>
                </div>
            </section>
            <section className="w-1/2 p-5 h-5/6">
                {options && <DonutChart options={options} votedOnOptions={votedOnOptions} />}
            </section>
        </div>
        <section className="w-full flex flex-row flex-wrap">
            {votedIndividual && votedIndividual.map((el, i) => <ChartEl data={el} key={i} i={i} />)}
        </section>
    </div>
}


const DonutChart = ({ votedOnOptions, options }) => {
    const donutOptions = {
        plugins: {
            autocolors: {
                mode: 'data',
            },
            legend: {
                align: "end",
                position: "bottom"
            },
            title: {
                display: true,
                text: "Votings",
                font: {
                    size: 18
                }
            }
        }
    }
    const donutData = {
        labels: options && options.map((el, i) => "Option " + (i + 1)),
        datasets: [{
            label: "Vot",
            data: votedOnOptions,
            borderWidth: 2
        }]
    };
    return <div className=" bg-gray-300 p-5 rounded-lg shadow-md shadow-gray-400">
        <Doughnut data={donutData} options={donutOptions} />
    </div>
}

const ChartEl = props => {
    const { data, i } = props;

    let final = {};
    for (let yr of Object.keys(data)) {
        for (let dept of Object.keys(data[yr])) {
            for (let sec of Object.keys(data[yr][dept])) {
                if (data[yr][dept][sec] !== null) {
                    if (final[dept]) {
                        final[dept] += data[yr][dept][sec]
                    } else {
                        final[dept] = data[yr][dept][sec]
                    }
                }
            }
        }
    }

    console.log(final);

    const barOptions = {
        plugins: {
            title: {
                display: true,
                text: "Option " + (i + 1)
            },
            legend: {
                display: false
            },
            autocolors: {
                offset: 6
            }
        },
        scales: {
            y: {
                ticks: {
                    maxTickLimits: 10,
                    autoSkip: false,
                    stepSize: 1

                }
            }
        }
    }
    const barData = {
        labels: Object.keys(final),
        datasets: [{
            label: "Votes",
            data: Object.values(final),
        }]

    }
    return <div className="w-1/2 aspect-video p-3">
        <div className="rounded-md h-full relative bg-gray-300 p-2 shadow-md shadow-gray-400">
            <Bar options={barOptions} data={barData} />
        </div>
    </div>
}