import './App.css';
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import {useState, useEffect, useRef} from "react";
import Header from "./components/header/Header";
import Modal from "./components/modal/Modal";
import SuccessfulModal from "./components/modal/SuccessfulModal/SuccessfulModal";

function App() {
    const [pickedPizza, setPickedPizza] = useState([]);
    const [players, setPlayers] = useState(0);
    const [packagePrice, setPackagePrice] = useState(0);
    const [bigSoda, setBigSoda] = useState(0);
    const [smallSoda, setSmallSoda] = useState(0);
    const [birthdayRoom, setBirthdayRoom] = useState("nei");
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('')

    const modal = useRef(null);


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


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "orders"), {
                name,
                players,
                packagePrice,
                pizzas: pickedPizza,
                bigSoda,
                smallSoda,
                birthdayRoom,
                datetime: e.target.datetime.value,
                totalPrice: price,
                createdAt: new Date()
            });
            handleOpenModal()
            setName('')
            setPlayers(0);
            setPackagePrice(0);
            setPickedPizza([]);
            setBigSoda(0);
            setSmallSoda(0);
            setBirthdayRoom("nei");
            setPrice(0);
            e.target.reset();

        } catch (error) {
            console.error("Error:", error);
            alert("Noe gikk galt");
        }
    };


    function handleOpenModal() {
        modal.current.open()

    }
    function handleCloseModal() {
        modal.current.close()
    }






    return (
        <div className="App">
            <Modal ref={modal}>
                <SuccessfulModal price={price} onClose={handleCloseModal}/>
            </Modal>
            <Header />
            <form  onSubmit={submitHandler}>
                <h2>CHECKOUT</h2>
                <label>
                    <p>Your full name:</p>
                    <input
                        placeholder="Name Surname"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="user-input"
                        type="text"
                        required
                    />
                </label>
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
                            required
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
                    required
                    >
                        <option value="0">Velge</option>
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
                    <input className="date-input" type="datetime-local" name="datetime" required />
                </label>

                <span className="price">Total pris: {price} kr</span>

                <button className="submit-btn" type="submit">Bestill</button>
            </form>
        </div>
    );
}

export default App;
