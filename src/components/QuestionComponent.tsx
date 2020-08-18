import React from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import "./QuestionComponent.css";

const QuestionComponent: React.FC<{
    questionText: string | null;
    questionImg: string[] | null;
}> = ({ questionText, questionImg }) => {
    return (
        <div className="QuestionContainer">
            <div className="QuestionText">
                {questionText}
                <div className="QuestionImg">
                    {questionImg?.map((d) => {
                        return <img src={d}></img>;
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuestionComponent;
