import styles from './Categories.module.css';
import allImg from '../../../assets/categoryImages/all.png';
import medicalImg from '../../../assets/categoryImages/medicine.png';
import fruitImg from '../../../assets/categoryImages/fruits.jpg';
import worldImg from '../../../assets/categoryImages/world.png';
import indiaImg from '../../../assets/categoryImages/india.png';

const Categories = ({ handleCategoryClick, categories, selectedCategory }) => {
    const images = {
        medical: medicalImg,
        fruits: fruitImg,
        world: worldImg,
        india: indiaImg,
    };

    return (
        // List of Categories Container
        <div className={styles.categoriesConDiv}>
            {/* All Category Div */}
            <div
                className={styles.categoryDiv}
                onClick={() => handleCategoryClick('All')}
                style={{
                    backgroundImage: `linear-gradient(#00000060, #00000100),url(${allImg})`,
                    border:
                        'All' === selectedCategory
                            ? '0.3rem solid #73abff'
                            : 'none',
                    marginLeft: '1rem',
                }}
            >
                <h3 className={styles.categoryName}>All</h3>
            </div>
            {/* Medical,Fruits,World,India Div    */}
            {categories &&
                categories.map((category, index) => (
                    <div
                        className={styles.categoryDiv}
                        key={index}
                        onClick={() => handleCategoryClick(category)}
                        style={{
                            backgroundImage: `linear-gradient(#00000060, #00000100),${
                                category === 'Medical'
                                    ? `url(${images.medical})`
                                    : category === 'Fruits'
                                    ? `url(${images.fruits})`
                                    : category === 'World'
                                    ? `url(${images.world})`
                                    : `url(${images.india})`
                            }`,
                            border:
                                category === selectedCategory
                                    ? '0.3rem solid #73abff'
                                    : 'none',
                        }}
                    >
                        <h3 className={styles.categoryName}>{category}</h3>
                    </div>
                ))}
        </div>
    );
};

export default Categories;
