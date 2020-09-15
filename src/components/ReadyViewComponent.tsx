import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

const ReadyViewComponent: React.FC<{ setStartCheck: any }> = ({
    setStartCheck,
}) => {
    const buttonClick = () => {
        setStartCheck(true);
    };
    return (
        <div>
            <h1>準備は良いですか？</h1>
            <h2>良ければスタートボタンを押してください</h2>
            <h3>10問おきに継続，終了を選べます</h3>
            <h3>終了後アンケートにお応えください</h3>
            <Button color="secondary" onClick={buttonClick}>
                start
            </Button>
        </div>
    );
};

export default ReadyViewComponent;
