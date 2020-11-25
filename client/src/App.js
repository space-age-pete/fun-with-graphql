import React, { useRef, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import "./index.css";
import {
  DELETE_RACER_MUTATION,
  FETCH_RACERS_QUERY,
  INCREMENT_RACER_WINS_MUTATION,
  REGISTER_RACER_MUTATION,
} from "./utils/graphql";
//please branch

function App() {
  const nameRef = useRef(null);
  const carRef = useRef(null);

  const [name, setName] = useState("");
  const [car, setCar] = useState("");

  const { data, data: { racers } = {} } = useQuery(FETCH_RACERS_QUERY);

  const [registerRacer] = useMutation(REGISTER_RACER_MUTATION, {
    onCompleted() {
      // nameRef.current.value = "";
      setCar("");
      setName("");
    },
    update(cache, { data }) {
      const existingRacers = cache.readQuery({
        query: FETCH_RACERS_QUERY,
      });
      console.log(existingRacers, data);
      //data.racers = [result.data.registerRacer, ...data.racers];
      cache.writeQuery({
        query: FETCH_RACERS_QUERY,
        data: { racers: [...existingRacers.racers, data.registerRacer] },
      });
    },
    // refetchQueries: [{ query: FETCH_RACERS_QUERY }],
    variables: { name, car },
  });

  const [winRace] = useMutation(INCREMENT_RACER_WINS_MUTATION);

  const [killRacer, { error: killError }] = useMutation(
    DELETE_RACER_MUTATION,
    {}
  );

  const kill = (id) => {
    // let id = event.target.dataset.id;
    console.log(typeof id);
    killRacer({
      update(cache) {
        const existingRacers = cache.readQuery({
          query: FETCH_RACERS_QUERY,
        });
        cache.writeQuery({
          query: FETCH_RACERS_QUERY,
          data: {
            racers: existingRacers.racers.filter((racer) => racer.id !== id),
          },
        });
      },
      variables: { id },
    });
  };

  // const regRac = (event) => {
  //   event.preventDefault();
  //   console.log(nameRef.current.value);
  //   nameRef.current.value = "";
  // };

  if (!data) return null;
  if (killError) {
    console.log(killError);
    return null;
  }

  return (
    <div>
      <div className="wrapper">
        {racers &&
          racers.map(({ id, name, car, wins }) => (
            <div key={id}>
              <div
                className="box"
                data-id={id}
                onClick={(e) => winRace({ variables: { id } })}
              >
                <h2>{name}</h2>
                <h4>drives the {car}</h4>
                {/* {wins > 0 && <p>and has won races</p>} */}
                {/* {typeof wins} */}
                {wins ? (
                  <p>and has won {wins} race(s)</p>
                ) : (
                  <p>and has never won a race</p>
                )}
              </div>
              <button
                data-id={id}
                onClick={() => kill(id)}
                // onClick={() => killRacer({ variables: { id } })}
              >
                Knock Off Course
              </button>
            </div>
          ))}
      </div>
      <div className="form">
        <label htmlFor="nameInput">Name:</label>
        <input
          name="nameInput"
          ref={nameRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="carInput">Car:</label>
        <input
          name="carInput"
          ref={carRef}
          value={car}
          onChange={(e) => setCar(e.target.value)}
        />
        <br />
        <button onClick={registerRacer} style={{ marginTop: "10px" }}>
          Register
        </button>
      </div>
    </div>
  );
}

export default App;
