import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const ExpertCarts = () => {
  const [experts, setExperts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/public/experts.json")
      .then((res) => res.json())
      .then((data) => setExperts(data));
  }, []);

  //   add to list
  const addList = (id) => {
    const expert = experts.find((ex) => ex.id == id);
    const isExists = cart.find((ex) => ex.id == expert.id);
    if (!isExists) {
      setCart([...cart, expert]);
    }
  };

//   remove from cart
  const removeList = (id) =>{
    setCart(cart.filter(item => item.id != id));
  };

  return (
    <div className="container mx-auto p-5 flex justify-around relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <div className="text-center p-5">
              <img
                src={expert.img}
                alt={expert.name}
                className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 transform-gpu transition duration-700 hover:skew-y-12"
              />
              <h1 className="text-xl font-bold mt-3 text-gray-800">
                {expert.name}
              </h1>
              <p className="text-gray-600 text-sm">{expert.designation}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-b-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Age:</span> {expert.age}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Address:</span> {expert.address}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Salary:</span> ${expert.salary}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => addList(expert.id)}
                className="my-3 cursor-pointer bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 transition transform hover:scale-105"
              >
                Add to List
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="shadow-xl mx-2 p-5 sticky top-5 rounded-md h-screen overflow-y-scroll min-w-sm ">
        <div>
          <p className="font-semibold">
            Expert Added: <span className="font-thin">{cart.length}</span>
          </p>
          <p className="font-semibold">
            Total Cost:{" "}
            <span className="font-thin">
              $
              {cart.reduce(
                (totalSalary, expert) => expert.salary + totalSalary,
                0
              )}{" "}
              per mounth
            </span>
          </p>
          <hr />
        </div>
        <div className="mt-5">
          {cart.length > 0 ? (
            cart.map((expert) => (
              <div
                key={expert.id}
                className="flex justify-between items-center bg-gray-200 rounded-md my-2 pr-2"
              >
                <img
                  src={expert.img}
                  alt=""
                  className="w-16 h-16 rounded-bl-md rounded-tl-md"
                />
                <div className="text-xl">
                  <h3>{expert.name}</h3>
                </div>
                <button onClick={() => removeList(expert.id)} className="transform hover:scale-105 cursor-pointer">
                    <Trash2 className="text-red-400"></Trash2>
                </button>
              </div>
            ))
          ) : (
            <p>No expert Found</p>
          )}
        </div>
        <button
          className="rounded-md bg-blue-400 px-3 py-2 text-white font-semibold w-full mt-5 hover:bg-blue-500 transition duration-300 transform hover:scale-105"
          type="submit"
        >
          Confirm List
        </button>
      </div>
    </div>
  );
};

export default ExpertCarts;
