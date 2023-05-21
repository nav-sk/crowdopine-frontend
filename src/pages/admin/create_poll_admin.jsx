import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Textarea,
    useToast
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FiCheck, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { request } from "../../utility/utils";
import { AuthContext } from "../../utility/userAuthContext";
import { useDispatch } from "react-redux";
import { setLivePolls, setRecentPolls } from "../../redux/actions/pollsDataAction";


const Page1 = (props) => {
    const options = props.options;
    const optionElement = props.optionElement;
    const statement = props.statement;
    const title = props.title
    return <div className="w-7/12 flex flex-col">
        <FormControl className="mb-10">
            <FormLabel fontWeight="semibold" fontSize="2xl" className="mb-5">Title:</FormLabel>
            <Input name="statement" size="lg" placeholder="Statement goes here" variant="filled" width="full"
                background="DBlue.700" _focus={{ background: "DBlue.700" }}
                _hover={{ background: "DBlue.700" }}
                value={title}
                maxLength="20"
                onChange={e => props.setTitle(e.target.value)}
                className="text-white" rounded="xl" />
        </FormControl>
        <FormControl className="mb-10">
            <FormLabel fontWeight="semibold" fontSize="2xl" className="mb-5">Statement:</FormLabel>
            <Textarea name="statement" size="lg" placeholder="Statement goes here" variant="filled" width="full"
                background="DBlue.700" _focus={{ background: "DBlue.700" }}
                _hover={{ background: "DBlue.700" }}
                value={statement}
                onChange={e => props.setStatement(e.target.value)}
                className="text-white" rounded="xl" />
        </FormControl>
        <p className="text-2xl font-semibold">Options: </p>
        <div className="flex flex-col bg-DBlue px-2 rounded-lg my-5 px-5 py-5">
            {options.map(optionElement)}
            <Button width="max-content" className="self-end" colorScheme="Blue" rounded="full"
                onClick={props.onClickAddOption}>Add Option</Button>
        </div>
    </div>;
}

const Page2 = (props) => {
    const [selections, makeSelections] = useState({});
    const [datetime, setdatetime] = useState("");
    const { dateTime, Context } = props;

    useEffect(() => {
        dateTime(datetime);
    }, [datetime]);

    useEffect(() => {
        Context(selections);
    })
    useEffect(() => {
        if (Object.keys(selections).length === 0) {
            if (props.divisions === null) {

            } else {
                let division = {};
                for (let item of Object.entries(props.divisions)) {
                    let year = {};
                    for (let dept of Object.entries(item[1])) {
                        let sec = {};
                        for (let sec_ of dept[1]) {
                            sec[sec_] = false;
                        }
                        year[dept[0]] = sec;
                    }
                    division[item[0]] = year;
                }
                makeSelections(division)
            }
        }
    }, [props.divisions, selections])

    const SelectionContext = (props) => {
        const selections = props.selections;
        console.log(selections)
        const [yearState, setYearState] = useState(selections);
        const bgColors = ["pink-300", "gray-400", "yellow-300", "sky-300"];

        useEffect(() => {
            console.log(yearState);
        }, [yearState])

        const updateYearState = (state, year) => {
            console.log("calling")
            let tObj = yearState;
            tObj[year] = state;
            setYearState({ ...tObj });
        }
        const InEachDept = props => {
            const [sectionsSelected, setSectionsSelected] = useState(props.sections);
            const { dept, updateDeptState } = props;

            const allChecked = Object.values(sectionsSelected).every(Boolean);
            const isIndeterminate = Object.values(sectionsSelected).some(Boolean) && !allChecked;

            return <div
                className="flex flex-col px-3 py-2 border-black border-2 rounded-lg w-36 mx-3 bg-white flex-shrink-0">
                <div className="flex w-full flex-row flex-nowrap justify-around px-2 items-center">
                    <p className="text-2xl font-semibold whitespace-nowrap">{dept}</p>
                    <Checkbox colorScheme="black" size="lg" className="h-fit" background="#00000011"
                        isIndeterminate={isIndeterminate} isChecked={allChecked}
                        onChange={(e) => {
                            let tArr = Object.keys(sectionsSelected);
                            let tObj = {};
                            for (let i of tArr) tObj[i] = e.target.checked;
                            setSectionsSelected({ ...tObj });
                            updateDeptState({ ...tObj }, dept);
                        }
                        } />
                </div>
                <div className="w-full h-1 bg-black" />
                <div className="flex flex-row flex-nowrap px-2 justify-around py-2">
                    {Object.entries(sectionsSelected).map((el, i, arr) => {
                        return <Checkbox key={i} size="lg" colorScheme="Wood" background="#00000011"
                            isChecked={Boolean(Object.values(sectionsSelected)[i])}
                            onChange={e => {
                                let tObj = { ...sectionsSelected };
                                tObj[Object.keys(sectionsSelected)[i]] = e.target.checked;
                                setSectionsSelected(tObj);
                                console.log(tObj)
                                console.log(sectionsSelected)
                                updateDeptState({ ...tObj }, dept);
                            }} />
                    })}
                </div>
            </div>
        }

        const InEachYear = props => {
            const { year, depts, updateYearState, bgColor } = props;
            const [allDeptState, setAllDeptState] = useState(depts);
            const updateDeptState = (state, dept) => {
                let tObj = allDeptState;
                tObj[dept] = state;
                console.log(state)
                setAllDeptState({ ...tObj });
                console.log("called")
                updateYearState(allDeptState, year);
            }

            return <div className={`px-1 rounded-xl my-2 w-full flex flex-col bg-opacity-70 bg-` + bgColor}>
                <p className="text-4xl font-semibold pl-5 pt-5">{year}</p>
                <div className="w-full flex flex-nowrap flex-row overflow-auto mb-5">
                    {
                        Object.entries(allDeptState).map((el, i, arr) => {
                            return Object.keys(el[1]).length > 0 ?
                                <InEachDept dept={el[0]} sections={el[1]} key={i}
                                    updateDeptState={updateDeptState} /> : <div key={i}></div>

                        })
                    }
                </div>
            </div>
        }

        return <div className="w-full p-5 ">
            {
                Object.entries(yearState).map((el, i, arr) => {
                    return <InEachYear year={el[0]} depts={el[1]} key={i} bgColor={bgColors[i]}
                        updateYearState={updateYearState} />
                })
            }
        </div>
    }

    return <div className="w-full flex flex-col items-center">
        <div className="w-7/12 flex flex-col bg-DBlue rounded-lg text-white p-5">
            <p className="font-semibold text-3xl mb-5">When the poll ends?</p>
            <Input type="datetime-local" borderColor="Pink.400" color="white" borderWidth={2}
                focusBorderColor="Pink.500"
                placeholder="Choose end time"
                min={new Date().toISOString().replace(/\.\d{3}/, '')}
                _hover={{ borderColor: "Pink" }} onChange={e => setdatetime(e.target.value)} />
        </div>
        <div className="w-full rounded-xl my-5">
            <p className="mt-5 text-4xl font-semibold pl-5">Select the voters</p>
            <SelectionContext selections={selections} />
        </div>
    </div>
}
export const CreatePollAdmin = () => {
    const user = useContext(AuthContext);

    const [options, setOptions] = useState([""]);
    const [statement, setStatement] = useState("")
    const [pageNo, setPageNo] = useState(1);
    const [divisions, setDivisions] = useState(null);
    const [dTime, setdTime] = useState("");
    const [context, setContext] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const toast = useToast();
    const dispatch = useDispatch();
    const dateTime = (datetime) => {
        setdTime(datetime);
    }

    const Context = (_context) => {
        setContext(_context);
    }

    useEffect(() => {
        if (divisions === null && user !== null) {
            request.get("admin/get/divisions").then(result => {
                setDivisions({ ...result.data });
            })
        }
    }, [divisions, user]);


    const onClickAddOption = (e) => {
        options.push("");
        setOptions([...options]);
        console.log(options)
    }

    const onNextClick = () => {

        if (pageNo === 1) {
            setPageNo(2);
        } else {
            let opt = options.filter(el => el.trim() !== "");
            if (title.trim() !== "" && statement.trim() !== "" && opt.length !== 0 && dTime.trim() !== "" && Object.keys(context).length !== 0) {
                setLoading(true);
                request.post("/admin/create/poll", {
                    title: title,
                    statement: statement,
                    options: opt,
                    option_count: opt.length,
                    ends_by: dTime,
                    context: context
                }).then(result => {
                    toast({ title: "Success", description: "Poll created successfully", variant: "subtle", duration: 2000 });
                    setLoading(false);
                    dispatch(setRecentPolls(null));
                    dispatch(setLivePolls(null));
                }).catch(err => {
                    toast({ title: "Error", description: "An Error Occured", variant: "subtle", duration: 2000 });
                    setLoading(false);
                })
            } else {
                setError("An error occured");
                console.log(opt)
            }
        }
    }
    const optionElement = (option, index, arr) => {
        return <div className="my-2 w-full h-full" key={index}>
            <div className="bg-transparent rounded-lg px-5 py-2">
                <InputGroup borderColor="Pink.400">
                    <InputLeftAddon backgroundColor="Pink.400" color="Sandal.100"
                        children={String.fromCharCode(index + 65)} pointerEvents="none" />
                    <Input borderWidth="medium" focusBorderColor="Pink.600" color="Sandal.100"
                        _hover={{ borderColor: "Pink.600" }} placeholder={"Option " + (index + 1)}
                        value={options[index]}
                        autoFocus={index + 1 === arr.length}
                        onChange={e => {
                            const tArr = options;
                            tArr[index] = e.target.value;
                            setOptions([...tArr]);
                        }} />
                    {(arr.length !== 1) &&
                        <InputRightElement children={<FiX />} cursor="pointer" color="Sandal.100"
                            onClick={e => {
                                const tArr = options;
                                tArr.splice(index, 1);
                                console.log(index);
                                setOptions([...tArr])
                            }} />}
                </InputGroup>
            </div>
        </div>
    }

    return <div className="text-black h-full w-full overflow-y-auto bg-Sandal p-5 rounded-l-3xl">
        <h1 className="text-7xl font-bold pl-10 pt-10">Create Poll</h1>
        <section className="flex items-center mt-5 flex-col w-full justify-center">
            <div className="flex flex-col w-full items-center">
                {pageNo === 1 ?
                    <Page1 options={options} optionElement={optionElement} onClickAddOption={onClickAddOption}
                        setStatement={setStatement} statement={statement} title={title} setTitle={setTitle} />
                    :
                    <Page2 divisions={divisions} dateTime={dateTime} Context={Context} />}
                <p className="text-red-400 font-semibold self-end pr-48">{error}</p>
                <div className="self-end mt-5 flex justify-between w-full px-48 mb-48">
                    <Button aria-label="Next" variant="solid" rounded="full" size="lg"
                        colorScheme="pink" visibility={pageNo === 1 ? "hidden" : ""}
                        onClick={e => setPageNo(1)}
                        leftIcon={<FiChevronLeft />}>Previous</Button>
                    <Button aria-label="Prev" variant={pageNo === 1 ? "solid" : "solid"} rounded="full" size="lg"
                        colorScheme="pink"
                        onClick={onNextClick}
                        isLoading={loading}
                        rightIcon={pageNo === 1 ? <FiChevronRight /> :
                            <FiCheck />}>{pageNo === 1 ? "Next" : "Create"}</Button>
                </div>
            </div>
        </section>
        <div className="bg-pink-300 bg- bg-sky-300 bg-gray-400 bg-yellow-300 hidden" />
    </div>
}