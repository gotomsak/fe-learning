import React, {
    useState,
    useEffect,
    useRef,
    createRef,
    RefObject,
} from "react";
import { useSelector, useDispatch } from "react-redux";

const WebCameraComponent: React.FC<{
    start: boolean;
    stop: boolean;
    setBlobData: any;
    setWebSocketData1: any;
    setWebSocketData2: any;
    method1: boolean;
    method2: boolean;
    sendData?: any;
}> = ({
    start,
    stop,
    setBlobData,
    setWebSocketData1,
    setWebSocketData2,
    method1,
    method2,
    sendData,
}) => {
    const videoRef = createRef<HTMLVideoElement>();
    const [video, setVideo] = useState<HTMLVideoElement>();
    const [check, setCheck] = useState(0);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
    const [webSocket1, setWebSocket1] = useState<WebSocket>(
        new WebSocket("ws://localhost:8765")
    );
    const [webSocket2, setWebSocket2] = useState<WebSocket>(
        new WebSocket("ws://192.168.10.136:8765")
    );

    const [streamState, setStreamState] = useState<MediaStream | null>(null);
    const dispatch = useDispatch();

    // refをstateにセット？
    useEffect(() => {
        if (videoRef.current !== null) {
            setCheck(1);
            setVideo(videoRef.current!);
        }
        console.log(videoRef.current);
    }, []);

    // レンダリング時にレコーダーをセット？
    useEffect(() => {
        console.log("check");
        console.log(videoRef);
        if (check == 1) {
            webCameraInit().then((stream) => {
                video!.srcObject = stream!;
                setStreamState(stream!);
                setRecorder(
                    new MediaRecorder(stream!, {
                        mimeType: "video/webm",
                    })
                );
            });
        }
    }, [check]);

    // // MediaRecorderが更新されるたび，blob配列にdataを保存
    // useEffect(() => {
    //     if (recorder !== null) {
    //         recorder!.ondataavailable = (e) => {
    //             recordedChunks.push(e.data);
    //         };
    //     }
    // }, [recorder]);

    // start時にn秒おきに同時にwebsocketで画像を送信
    useEffect(() => {
        // { blob: getCanvasData(), data: sendData }.toString()
        if (start === true) {
            recorder!.start(200);
            if (method1 == true) {
                webSocketInit1();
            }
            if (method2 == true) {
                webSocketInit2();
            }
            setInterval(() => {
                if (method1 == true) {
                    webSocket1!.send(getCanvasData());
                }
                if (method2 == true) {
                    webSocket2!.send(getCanvasData());
                }
            }, 500);
        }
    }, [start]);

    // stop時にe-learning中の動画を取得，保存
    useEffect(() => {
        if (stop === true) {
            webSocket1!.close();
            webSocket2!.close();
            setBlobData(getBlobData());
            streamState?.getTracks()[0].stop();
            recorder!.stop();
        }
    }, [stop]);

    const webSocketInit1 = () => {
        webSocket1!.onmessage = (event) => {
            console.log(event.data);
            setWebSocketData1(event);
        };
        webSocket1!.onclose = (event) => {
            console.log("simeta");
        };

        webSocket1!.onopen = (event) => {
            console.log("seikou1");
        };
        webSocket1!.onerror = (e) => {};
    };
    const webSocketInit2 = () => {
        webSocket2!.onmessage = (event) => {
            console.log(event.data);
            setWebSocketData2(event);
        };
        webSocket2!.onclose = (event) => {
            console.log("simeta");
        };

        webSocket2!.onopen = (event) => {
            console.log("seikou2");
        };
        webSocket2!.onerror = (e) => {};
    };

    // webカメラの初期化
    const webCameraInit = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            return await navigator.mediaDevices.getUserMedia({
                video: { width: 352, height: 288 },
            });
        }
    };

    // blobdataを取得
    const getBlobData = () => {
        const _chunks = recordedChunks.splice(0, recordedChunks.length); // バッファを空にする
        const b = new Blob(_chunks, {
            type: "video/mp4",
        });
        return b;
    };

    // 画像をbase64で取得
    const getCanvasData = () => {
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = video!.offsetWidth;
        canvas.height = video!.offsetHeight;
        canvas
            .getContext("2d")!
            .drawImage(video!, 0, 0, video!.offsetWidth, video!.offsetHeight);
        const base64 = canvas.toDataURL("image/png");
        return base64;
    };

    return (
        <div className="WebCameraContainer">
            <video ref={videoRef} id="video" autoPlay></video>
        </div>
    );
};
export default WebCameraComponent;
