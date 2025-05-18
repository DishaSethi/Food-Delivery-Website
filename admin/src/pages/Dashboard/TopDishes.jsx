import "./TopDishes.css";

const TopDishes=({dishes})=>(

    <div className="top-dishes-container">
        <h2 className="top-dishes-title">Top Selling Dishes</h2>
        <ul className="top-dishes-list">
            {dishes.map((dish,idx)=>(
                <li key={idx} className="top-dish-item">
                    <span>{dish.name}</span>
                    <span className="top-dish-sales">{dish.sales}</span>
                </li>

            ))}
        </ul>
    </div>
)

export default TopDishes;