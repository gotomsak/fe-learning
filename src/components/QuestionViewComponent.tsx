import React, { useState, useEffect, useRef } from 'react'
import TitleComponent from './TitleComponent'
import QuestionComponent from './QuestionComponent'
import LogComponent from './LogComponent'
import CalculatorComponent from './CalculatorComponent'
import AnsChoiceComponent from './AnsChoiceComponent'
import AnsResultComponent from './AnsResultComponent'
import { getQuestion } from '../apis/backendAPI/getQuestion'
import { webCameraInit } from '../apis/webCameraAPI'
import './QuestionViewComponent.css'
import { checkAnswer } from '../apis/backendAPI/checkAnswer'
import { CheckAnswerPost } from '../apis/backendAPI/interfaces'
import { getNowTimeString } from '../utils/utils'
import store from '..'
import { correctNumberState } from '../states/correctNumberState'


const QuestionViewComponent: React.FC<{questionID:number, setNext:any, setAnswerResultIDs: any, setCorrectAnswerNumber:any}>
                                                    = ({questionID, setNext, setAnswerResultIDs, setCorrectAnswerNumber}) =>{
    const [questionText, setQuestionText] = useState("")
    const [questionImg, setQuestionImg] = useState([])
    const [questionTitle, setQuestionTitle] = useState("")
    const [answerText, setAnswerText] = useState([])
    const [answerImg, setAnswerImg] = useState([])
    const [calculatorResult, setCalculatorResult] = useState("")
    const [answerResult, setAnswerResult] = useState("")
    const [answerFinal, setAnswerFinal]=useState("")
    const [startTime, setStartTime] = useState("")
    const [windowNonFocusTimer, setNonFocusTimer] = useState(0)
    const refWindowNonFocusTimer = useRef(windowNonFocusTimer)

    useEffect(()=>{
        if(answerFinal != ""){
            checkAnswer(setResult())
                .then((res)=>{
                    console.log(res.data)
                    if (res.data["result"]=="correct"){
                        // setCorrectAnswerNumber()
                        store.dispatch({type:"correct"})
                        
                    }
                    console.log(store.getState())
                    store.dispatch({type:"reset_correct"})
                    console.log(store.getState())
                    setAnswerResult(res.data["answer"])
                    setAnswerResultIDs({type:'add',number: res.data["answer_result_id"]})
                    store.dispatch({type:'ansResultIDSet', id: res.data["answer_result_id"]})
                })
        }
    },[answerFinal])

    useEffect(() => {
        questionFetch(questionID)
    },[questionID])

    useEffect(()=>{
        refWindowNonFocusTimer.current=windowNonFocusTimer
    },[windowNonFocusTimer])

    useEffect(()=>{
        let windowNonFocusTimerFlag:any;

        webCameraInit()
        window.addEventListener('focus',()=>{
            clearInterval(windowNonFocusTimerFlag)
        })
        window.addEventListener('blur',()=>{
            windowNonFocusTimerFlag = setInterval(()=>{
                setNonFocusTimer(refWindowNonFocusTimer.current+1)
            }, 1000);
        })
    },[])

    const questionFetch = (qid: number) => {
        setStartTime(getNowTimeString())
        getQuestion(qid)
            .then((res)=>{
                setQuestionText(res.data.question)
                setQuestionTitle(
                    res.data.season+" "+
                    res.data.question_num+" "+
                    res.data.genre)
                setQuestionImg(res.data.qimg_path)
                setAnswerText(res.data.ans_list)
                setAnswerImg(res.data.aimg_list)
            })
    }

    const setResult = ():CheckAnswerPost => {
        const end = getNowTimeString()
        return  {
            question_id:  questionID,
            user_id : Number(localStorage.getItem("user_id")),
            memo_log : calculatorResult,
            other_focus_second : windowNonFocusTimer,
            user_answer : answerFinal,
            start_time : startTime,
            end_time : end,
        }
    }
    const reset=()=>{
        setAnswerResult("")
        setNext(true)
    }

    return (
        <div className="QuestionContainer">
            <TitleComponent title={questionTitle}></TitleComponent>
            <QuestionComponent questionText={questionText} questionImg={questionImg}></QuestionComponent>
            <div className="LogsContainer">
                <LogComponent calculatorResult={calculatorResult}></LogComponent>
                <CalculatorComponent calculatorResult={setCalculatorResult}></CalculatorComponent>
            </div>
            <AnsChoiceComponent answerText={answerText} answerImg={answerImg} answerFinal={setAnswerFinal}></AnsChoiceComponent>
            {
                answerResult !=""&&
                <div>
                    <AnsResultComponent ansResult={answerResult}></AnsResultComponent>
                    <button onClick={reset}>next</button>
                </div>
            }
        </div>
    )
}

export default QuestionViewComponent