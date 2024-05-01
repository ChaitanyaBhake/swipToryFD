import  { useEffect, useState } from 'react';
import SlideForm from './SlideForm';
import styles from './StoryForm.module.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../common/Modal/modalSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import Button from '../../common/Button/Button';
import { editStorySuccess } from '../storySlice';
import Loader from '../../common/Loader/Loader';

const StoryForm = () => {
    const dispatch = useDispatch();

    const { story, singleStoryLoading } = useSelector((state) => state.story);
    const { userId } = useSelector((state) => state.auth);

    //Retrieve story slides from redux state
    const initialSlides = story && story.slides ? story.slides : [{}, {}, {}];

    //Use States
    const [slides, setSlides] = useState(initialSlides);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [error, setError] = useState('');

    // Update slides when singleStoryLoading changes
    useEffect(() => {
        if (!singleStoryLoading) {
            setSlides(story.slides);
        }
    }, [singleStoryLoading]);

    // Update currentSlide state
    useEffect(() => {
        setCurrentSlide(currentSlide);
    }, [currentSlide]);

    // Function to update slide data on input change
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setSlides((prevSlides) =>
            prevSlides.map((slide, i) =>
                i === index ? { ...slide, [name]: value } : slide
            )
        );
    };

    // Function to handle form submission
    const handleSubmit = async () => {
        const { VITE_APP_API_URL } = import.meta.env;

        try {
            //Slide Validation
            const isSlideValid = slides.some(
                (slide) =>
                    Object.keys(slide).length === 0 ||
                    slide.heading?.trim() === '' ||
                    slide.description?.trim() === '' ||
                    slide.imageLink?.trim() === '' ||
                    slide.genre?.trim() === ''
            );

            if (isSlideValid) {
                setError('Please fill out all fields for all slides');
                return;
            }

            if (slides.length < 3) {
                setError('Minimum 3 slides are required to post story');
                return;
            } else if (slides.length > 6) {
                setError('Please remove slides');
                return;
            }

            // HTTP PUT request to update story
            await axios
                .put(`${VITE_APP_API_URL}api/story/update/${story._id}`, {
                    slides,
                    addedBy: userId,
                })
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Story updated successfully', {
                            position: 'top-center',
                        });
                    }

                    dispatch(editStorySuccess());
                    dispatch(closeModal());
                });
        } catch (error) {
            console.log(error.response.data);
            toast.error('Error creating story', { position: 'top-center' });
        }
    };

    // Function to add a new slide
    const handleAddSlide = () => {
        if (slides.length < 6) {
            setSlides((prevSlides) => [...prevSlides, {}]);
            setCurrentSlide(slides.length);
        }
    };

    // Function to remove a slide
    const handleRemoveSlide = (index) => {
        if (slides.length > 3) {
            setSlides((prevSlides) => prevSlides.filter((_, i) => i !== index));
            index > 0 && setCurrentSlide(index - 1);
        }
    };

    // Function to close the modal
    const handleClose = () => {
        dispatch(closeModal());
    };

    // Function to handle click on previous button
    const handlePrevClick = () => {
        setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 0);
    };

    // Function to handle click on next button
    const handleNextClick = () => {
        setCurrentSlide(
            currentSlide < slides.length - 1
                ? currentSlide + 1
                : slides.length - 1
        );
    };

    // Loading Animation till singleStoryLoading state is true
    if (singleStoryLoading) {
        return <Loader></Loader>;
    }

    return (
        <div className={styles.addStoryForm}>
            <h3 className={styles.storyFormHeading}>Add Story To Feed</h3>
            <div className={styles.smallHint}>Add upto 6 slides</div>

            {/* Slides and Add Slide Button Container */}
            <div className={styles.slidesDivCon}>
                {/* Slide Div */}
                {slides.map((_, index) => (
                    <div
                        className={styles.slideBoxDiv}
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        style={{
                            border:
                                currentSlide === index
                                    ? '2px solid #73ABFF'
                                    : 'none',
                        }}
                    >
                        Slide {index + 1}
                        {/* Slides 4, 5, and 6 should have x(close) icon  if slides length is more than 3 */}
                        {slides.length > 3 && index >= 3 && (
                            <div onClick={() => handleRemoveSlide(index)}>
                                {/* Cross Svg*/}
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                        position: 'absolute',
                                    }}
                                >
                                    <path
                                        d="M12 0C5.38341 0 0 5.38341 0 12C0 18.6166 5.38341 24 12 24C18.6166 24 24 18.6166 24 12C24 5.38341 18.6166 0 12 0ZM12 1.84615C17.6178 1.84615 22.1538 6.38221 22.1538 12C22.1538 17.6178 17.6178 22.1538 12 22.1538C6.38221 22.1538 1.84615 17.6178 1.84615 12C1.84615 6.38221 6.38221 1.84615 12 1.84615ZM8.50962 7.18269L7.18269 8.50962L10.6731 12L7.18269 15.4904L8.50962 16.8173L12 13.3269L15.4904 16.8173L16.8173 15.4904L13.3269 12L16.8173 8.50962L15.4904 7.18269L12 10.6731L8.50962 7.18269Z"
                                        fill="#FF0000"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                ))}

                {/* Add Button  */}
                <div
                    className={styles.slideBoxDiv}
                    onClick={handleAddSlide}
                    style={{
                        cursor: 'pointer',
                        display: slides.length === 6 ? 'none' : 'block',
                    }}
                >
                    Add +
                </div>
            </div>

            {/* Close Button SVG */}
            <svg
                className={styles.closeStoryFormIcon}
                onClick={handleClose}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 0C5.38341 0 0 5.38341 0 12C0 18.6166 5.38341 24 12 24C18.6166 24 24 18.6166 24 12C24 5.38341 18.6166 0 12 0ZM12 1.84615C17.6178 1.84615 22.1538 6.38221 22.1538 12C22.1538 17.6178 17.6178 22.1538 12 22.1538C6.38221 22.1538 1.84615 17.6178 1.84615 12C1.84615 6.38221 6.38221 1.84615 12 1.84615ZM8.50962 7.18269L7.18269 8.50962L10.6731 12L7.18269 15.4904L8.50962 16.8173L12 13.3269L15.4904 16.8173L16.8173 15.4904L13.3269 12L16.8173 8.50962L15.4904 7.18269L12 10.6731L8.50962 7.18269Z"
                    fill="#FF0000"
                />
            </svg>

            {/* SlideForm */}
            <div className={styles.slideFormConDiv}>
                {slides.map((slide, slideIndex) => (
                    <>
                        {slideIndex === currentSlide && (
                            <SlideForm
                                key={slideIndex}
                                slide={slide}
                                slideIndex={slideIndex}
                                handleChange={(e) =>
                                    handleChange(e, slideIndex)
                                }
                            />
                        )}
                    </>
                ))}
            </div>
            {/* SlideForm Ends */}

            {/* Error */}
            <span className={styles.formError}>{error}</span>

            {/* Previous Next Post Buttons */}
            <div className={styles.buttons}>
                <Button
                    myFunction={handlePrevClick}
                    color="#7eff73"
                    text="Previous"
                    size="small"
                ></Button>
                <Button
                    myFunction={handleNextClick}
                    color="#73abff"
                    text="Next"
                    size="small"
                ></Button>

                <div style={{ width: '100px' }}></div>

                <Button
                    myFunction={handleSubmit}
                    text="Update"
                    size="small"
                ></Button>
            </div>
        </div>
    );
};

export default StoryForm;
