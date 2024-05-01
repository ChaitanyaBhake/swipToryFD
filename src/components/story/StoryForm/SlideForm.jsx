import styles from './StoryForm.module.css';

import { categories } from '../../../constants';

const SlideForm = ({ slide, slideIndex, handleChange }) => {
    return (

        // Slide Form Container
        <div className={styles.slideFormCon}>

            <div className={styles.slideFormContent}>

                {/* Heading  */}
                <div className={`${styles.inputConDiv} ${styles.inputHeadingCon}`}>
                    <label className={styles.slideFormLabels}>
                        Heading :{' '}
                    </label>
                    <input
                        className={styles.slideFormInputs}
                        type="text"
                        name={`heading`}
                        value={slide.heading}
                        placeholder="Your Heading"
                        onChange={(e) => handleChange(e, slideIndex)}
                    />
                </div>

                {/* Description */}
                <div className={styles.inputConDiv}>
                    <label className={styles.slideFormLabels}>
                        Description :{' '}
                    </label>
                    <textarea
                        className={styles.descriptionInput}
                        type="text"
                        name={`description`}
                        value={slide.description}
                        placeholder="Story Description"
                        onChange={(e) => handleChange(e, slideIndex)}
                    />
                </div>

                {/* {Image Link} */}
                <div className={styles.inputConDiv}>
                    <label className={styles.slideFormLabels}>
                        Image URL :{' '}
                    </label>
                    <input
                        className={styles.slideFormInputs}
                        type="text"
                        name={`imageUrl`}
                        value={slide.imageUrl}
                        placeholder="Add Image URL"
                        onChange={(e) => handleChange(e, slideIndex)}
                    />
                </div>

                {/* Category */}
                <div className={styles.inputConDiv}>
                    <label className={styles.slideFormLabels}>
                        Category :{' '}
                    </label>

                    {/* DropDown Menu for Categories */}
                    <select
                        className={`${styles.slideFormInputs} ${styles.categories}`}
                        name="category"
                        onChange={(e) => handleChange(e, slideIndex)}
                        value={slide.category}
                    >
                        <option value="" style={{ color: 'red' }} >
                            Select Category
                        </option>
                        {categories.map((category) => (
                            <option
                                key={category + slideIndex}
                                value={category}
                            >
                                {category}
                            </option>
                        ))}
                    </select>

                    <h6 className={styles.hint2}>This field will be common for all slides</h6>
                </div>
            </div>
        </div>
    );
};

export default SlideForm;
