import * as faceapi from 'face-api.js';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import HomeLayout from '../Layouts/HomeLayout';
import { markAttendance } from '../Redux/Slices/AuthSlice';

const AttendanceForm = () => {
    const dispatch = useDispatch();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(30);
    const [verificationStarted, setVerificationStarted] = useState(false);
    const [debugInfo, setDebugInfo] = useState('');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const timerRef = useRef(null);
    const detectionRef = useRef(null);
    const blinkState = useRef({
        consecutiveLowRatios: 0,
        blinkDetected: false,
    });

    useEffect(() => {
        const loadModelsAndStartCamera = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
                await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
                console.log('Face API models loaded successfully');
                startCamera();
            } catch (err) {
                console.error('Error loading Face API models:', err);
                setError('Failed to load face detection models. Please try again later.');
            }
        };

        loadModelsAndStartCamera();
        getLocation();

        return
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play();
                };
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
            setError('Could not access the camera. Make sure you have granted permission.');
        }
    };

    const stopCamera = () => {
        console.log(120)
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
        }
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        if (detectionRef.current) {
            cancelAnimationFrame(detectionRef.current);
        }
    };

    const detectBlink = async () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const displaySize = { width: video.videoWidth, height: video.videoHeight };
            faceapi.matchDimensions(canvasRef.current, displaySize);

            const detections = await faceapi
                .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();
            console.log(detections)
            if (detections.length > 0) {
                const landmarks = detections[0].landmarks;
                const leftEye = landmarks.getLeftEye();
                const rightEye = landmarks.getRightEye();

                const leftEyeRatio = getEyeAspectRatio(leftEye);
                const rightEyeRatio = getEyeAspectRatio(rightEye);
                const avgRatio = (leftEyeRatio + rightEyeRatio) / 2;

                setDebugInfo(`Eye Aspect Ratio: ${avgRatio.toFixed(2)}`);

                console.log(avgRatio);

                // Detect blink
                if (avgRatio < 0.27) {
                    console.log(1)
                    blinkState.current.consecutiveLowRatios++;
                } else {
                    console.log(blinkState)
                    if (blinkState.current.consecutiveLowRatios >= 2 && !blinkState.current.blinkDetected) {
                        console.log("hello")
                        console.log(blinkState)
                        blinkState.current.blinkDetected = true;
                        handleSubmit(true);
                        return;
                    }
                    blinkState.current.consecutiveLowRatios = 0;
                }
            } else {
                setDebugInfo('No face detected.');
            }

            console.log("Verification Started:", verificationStarted);
            console.log("Time Left:", timeLeft);

            if (!verificationStarted && timeLeft > 0) {
                console.log("restart")
                detectionRef.current = requestAnimationFrame(detectBlink);
            }
        }
    };

    const getEyeAspectRatio = (eye) => {
        console.log("object")
        const verticalDist1 = getDistance(eye[1], eye[5]);
        const verticalDist2 = getDistance(eye[2], eye[4]);
        const horizontalDist = getDistance(eye[0], eye[3]);
        return (verticalDist1 + verticalDist2) / (2 * horizontalDist);
    };


    const getDistance = (point1, point2) => {
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (err) => {
                    console.error('Error getting location:', err);
                    setError('Could not retrieve location.');
                },
                {
                    enableHighAccuracy: true,
                }
            );
        } else {
            setError('Geolocation is not supported by your browser.');
        }
    };

    const handleSubmit = async (blinkDetected) => {
        if (latitude === null || longitude === null) {
            setError('Location could not be determined.');
            return;
        }

        setLoading(true);
        try {
            if (blinkDetected) {
                const res = await dispatch(markAttendance({ latitude, longitude, blinkDetected }));
                if (res.payload) {
                    alert(res.payload);
                }
            }
        } catch (err) {
            setError(err.response ? err.response.data : 'An error occurred.');
        } finally {
            setLoading(false);
            setVerificationStarted(false);
            setTimeLeft(30);
        }
    };

    const handleVerify = () => {
        setVerificationStarted(true);
        blinkState.current = { consecutiveLowRatios: 0, blinkDetected: false };
        setTimeout(() => {
            detectBlink();
        }, 1000);

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setVerificationStarted(false);
                    alert('No blink detected. Please try again.');
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <HomeLayout>
            <div className="py-20">
                <div className="max-w-md p-4 mx-auto bg-white rounded shadow">
                    <h2 className="mb-4 text-2xl font-bold">Mark Attendance</h2>
                    {error && <p className="mb-2 text-red-500">{error}</p>}
                    <video ref={videoRef} style={{ width: '100%' }} autoPlay playsInline></video>
                    <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }}></canvas>
                    <button
                        onClick={handleVerify}
                        className={`w-full bg-green-500 text-white px-4 py-2 rounded mb-4 ${verificationStarted ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={verificationStarted}
                    >
                        {verificationStarted ? `Verifying... (${timeLeft}s)` : 'Verify and Submit'}
                    </button>
                    <div className="mb-4">
                        <p>Latitude: {latitude ?? 'Loading...'}</p>
                        <p>Longitude: {longitude ?? 'Loading...'}</p>
                    </div>
                    <div className="mb-4">
                        <p>Debug Info: {debugInfo}</p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default AttendanceForm;
