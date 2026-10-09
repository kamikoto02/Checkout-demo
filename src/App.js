import './App.css';
import { useState, useEffect } from "react";

function App() {
    const [pickedPizza, setPickedPizza] = useState([]);
    const [players, setPlayers] = useState(0);
    const [packagePrice, setPackagePrice] = useState(0);
    const [bigSoda, setBigSoda] = useState(0);
    const [smallSoda, setSmallSoda] = useState(0);
    const [birthdayRoom, setBirthdayRoom] = useState("nei");
    const [price, setPrice] = useState(0);


    useEffect(() => {
        let total = 0;
        total += players * packagePrice;
        pickedPizza.forEach(p => {
            total += p.price * p.count;
        });

        total += bigSoda * 55;
        total += smallSoda * 35;

        if (birthdayRoom === "ja") total += 250;
        setPrice(total);
    }, [players, packagePrice, pickedPizza, bigSoda, smallSoda, birthdayRoom]);

    const PizzaHandler = (price, name) => {
        setPickedPizza(prevState => {
            const existing = prevState.find(p => p.name === name);
            if (existing) {
                return prevState.map(p =>
                    p.name === name ? { ...p, count: p.count + 1 } : p
                );
            } else {
                return [...prevState, { name, price, count: 1 }];
            }
        });
    };
    const ChangeCount = (name, delta) => {
        setPickedPizza(prevState =>
            prevState
                .map(p =>
                    p.name === name ? { ...p, count: Math.max(0, p.count + delta) } : p
                )
                .filter(p => p.count > 0)
        );
    };

    return (
        <div className="App">
            <form action="#">
                <h2>CHECKOUT</h2>

                <div className="first-group">
                    <label>
                        Antall spillere:
                        <select
                            name="antall"
                            onChange={e => setPlayers(Number(e.target.value))}
                        >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </label>

                    <label>
                        Velg spillpakke:
                        <select
                            name="package"
                            onChange={e => setPackagePrice(Number(e.target.value))}
                        >
                            <option value="0">-</option>
                            <option value="250">2 x 15 min – 250 kr pr. person</option>
                            <option value="300">3 x 15 min – 300 kr pr. person</option>
                        </select>
                    </label>
                </div>

                {/* PIZZA */}
                <h3>Pizza</h3>
                <label>
                    Velg pizza
                    <select
                        onChange={e => {
                            const value = e.target.value;
                            if (value !== "0") {
                                const name =
                                    value === "150"
                                        ? "Skinkepizza"
                                        : value === "175"
                                            ? "Pepperonipizza"
                                            : "Vegetarpizza";

                                PizzaHandler(Number(value), name);
                                e.target.value = "0";
                            }
                        }}
                    >
                        <option value="0">-</option>
                        <option value="150">Skinkepizza</option>
                        <option value="175">Pepperonipizza</option>
                        <option value="155">Vegetarpizza</option>
                    </select>

                    {pickedPizza.length > 0 && (
                        <div className="pizza-container">
                            {pickedPizza.map(p => (
                                <p key={p.name}>
                                    <span>{p.name} ({p.price} kr):</span>
                                    <button type="button" onClick={() => ChangeCount(p.name, 1)}>+</button>
                                    {p.count} stk
                                    <button type="button" onClick={() => ChangeCount(p.name, -1)}>-</button>
                                </p>
                            ))}
                        </div>
                    )}
                </label>

                {/* BRUS */}
                <h3>Brus</h3>
                <label>
                    Stor brus (0,6l – 55 kr):
                    <select
                        name="bigSoda"
                        onChange={e => setBigSoda(Number(e.target.value))}
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>

                <label>
                    Liten brus (0,33l – 35 kr):
                    <select
                        name="smallSoda"
                        onChange={e => setSmallSoda(Number(e.target.value))}
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>

                {/* Bursdagsrom */}
                <h3>Bursdagsrom</h3>
                <label>
                    Bursdagsrom (250 kr):
                    <select
                        name="birthdayRoom"
                        onChange={e => setBirthdayRoom(e.target.value)}
                    >
                        <option value="nei">Nei</option>
                        <option value="ja">Ja</option>
                    </select>
                </label>

                {/* Dato */}
                <h3>Dato</h3>
                <label>
                    Velg dato og tid:
                    <input className="date-input" type="datetime-local" name="datetime" />
                </label>

                <span className="price">Total pris: {price} kr</span>

                <button className="submit-btn" type="submit">Bestill</button>
            </form>
        </div>
    );
}

export default App;
