import { useState, useEffect } from 'react';
import styles from './StorySlider.module.css';
import reloadImg from '../../../assets/reloadImg.png';
import { useSelector } from 'react-redux';
import arrow from '../../../assets/arrow.png';

const StorySlider = ({ slides }) => {
    const { isSmallScreen } = useSelector((state) => state.layout);

    // Retrieving Image Url from Redux Store
    const images = slides && slides.map((slide) => slide.imageUrl);

    // Initializing progress bars based on the number of slides
    const progress =
        images &&
        images.map((_, index) => {
            return {
                id: index,
                progress: 0,
                image: images[index],
                completed: false,
            };
        });

    //Use States
    const [refresh, setRefresh] = useState(false);
    const [progressBars, setProgressBars] = useState(progress);
    const [imgIndex, setImgIndex] = useState(0);

    //Effect hook to update progress bars whenever imgIndex changes
    useEffect(() => {
        const animationInterval = 50; 

        const intervalId = setInterval(() => {
            updateProgress();
        }, animationInterval);

        return () => clearInterval(intervalId);
    }, [imgIndex]);

    // Function to update progress bars
    const updateProgress = () => {
        setProgressBars((prevProgressBars) => {
            return prevProgressBars.map((bar, index) => {
                if (index === imgIndex) {
                    const updatedProgress = Math.min(bar.progress + 1, 100);
                    const completed = updatedProgress === 100;

                    if (completed && index !== images.length - 1) {
                        setImgIndex((prevIndex) => prevIndex + 1);
                    }

                    return {
                        ...bar,
                        progress: updatedProgress,
                        completed: completed,
                    };
                }

                return bar;
            });
        });
    };

    // Function to handle click on next button
    const handleNextClick = () => {
        setProgressBars(progress);
        progressBars[imgIndex].progress = 0;

        if (refresh) {
            setImgIndex(0);
        }
        if (imgIndex === images.length - 1) {
            setRefresh(!refresh);
        } else {
            setImgIndex((prevIndex) => (prevIndex + 1) % images.length);
        }

        updateProgress(imgIndex);
    };

    // Function to handle click on previous button
    const handlePreviousClick = () => {
        setProgressBars(progress);
        progressBars[imgIndex].progress = 0;

        if (imgIndex === 0) {
            setImgIndex(0);
        } else {
            setImgIndex((prevIndex) => (prevIndex - 1) % images.length);
        }

        updateProgress(imgIndex);
    };

    /* Structure

     _____  _____  _____ (Progress Bars)

        ---------- 
        |        |
      < | Image  | > (Prev ,Next Arrows)
        |        |
        ---------- 

    
    */

    return (
        // Image Slider Container
        <div className={styles.imageSliderCon}>
            {/* Slides Buttons */}

            <div className={styles.buttonsDiv}>
                {/* Previous Button */}

                <button
                    className={styles.prevBtn}
                    onClick={() => handlePreviousClick()}
                >
                    <img
                        src={arrow}
                        alt="<"
                        style={{
                            transform: 'rotate(180deg)',
                            width: isSmallScreen ? '1rem' : '2rem',

                        }}
                    />
                </button>

                {/* Next Button */}

                <button
                    className={styles.nextBtn}
                    onClick={() => handleNextClick()}
                >
                    {refresh ? (
                        <img src={reloadImg} alt="reload" />
                    ) : (
                        <img
                            src={arrow}
                            alt=">"
                            style={{ width: isSmallScreen ? '1rem' : '2rem' }}
                        />
                    )}
                </button>
            </div>

            {/* Progress Bar Container */}

            <div className={styles.progressContainerDiv}>
                {progressBars &&
                    progressBars.map((bar) => {
                        const progressBarStyle = {
                            width: images
                                ? images.length === 1
                                    ? '100%'
                                    : `${100 / (images.length - 1)}%`
                                : '0%',
                        };

                        return (
                            <div
                                key={bar.id}
                                className={styles.progressBarDiv}
                                style={progressBarStyle}
                            >
                                <div
                                    className={`${styles.showProgressDiv} ${
                                        bar.completed &&
                                        styles.progressCompleted
                                    }`}
                                    style={{ width: `${bar.progress}%` }}
                                ></div>

                                {bar.progress === 0 && (
                                    <img
                                        src={bar.image}
                                        alt={`Image ${bar.id}`}
                                        width={600}
                                        height={600}
                                    />
                                )}
                            </div>
                        );
                    })}
            </div>

            {/* Image Slider */}

            <div className="slides" style={{ width: '100%', height: '100%' }}>
                {slides &&
                    slides.map((slide, index) => (
                        <>
                            <img
                                className={styles.sliderImg}
                                key={slide._id}
                                style={{
                                    display:
                                        index === imgIndex ? 'block' : 'none',
                                }}
                                src={slide?.imageUrl}
                                alt={`Slide ${index}`}
                            />

                            <div
                                className={styles.sliderText}
                                style={{
                                    display:
                                        index === imgIndex ? 'block' : 'none',
                                }}
                            >
                                <h1 className={styles.sliderHeading}>
                                    {slide?.heading}
                                </h1>

                                <p className={styles.sliderDesc}>
                                    {slide?.description}
                                </p>
                            </div>
                        </>
                    ))}
            </div>
        </div>
    );
};

export default StorySlider;
