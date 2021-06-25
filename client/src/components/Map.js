import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogs } from "./API";
import Forms from "./Forms";
import Backdrop from "./Backdrop";
import { useHistory } from "react-router-dom";

function LogMap() {
  const history = useHistory();
  function Suprise() {
    changeTheme("mapbox://styles/mapbox/dark-v10");
  }
  function Outdoor() {
    changeTheme("mapbox://styles/mapbox/outdoors-v11");
  }
  const [Theme, changeTheme] = useState("mapbox://styles/mapbox/outdoors-v11");
  const [listEntries, logsState] = useState([]);
  const [showPopup, togglePopup] = useState({});
  const [Modal, changeModal] = useState({});
  const [current, currentstate] = useState(false);
  const [viewport, setViewport] = useState({
    height: "100vh",
    width: "100vw",
    latitude: 13.04961385765527,
    longitude: 80.28195436534362,
    zoom: 4,
  });

  const getEntries = async () => {
    const listEntries = await listLogs();
    logsState(listEntries.logs);
  };
  useEffect(() => {
    getEntries();
    currentstate(false);
  }, [current]);
  function ModalOff() {
    changeModal({});
  }

  function ModalOn(props) {
    changeModal({
      ModalState: true,
      longitude: props.lngLat[0],
      latitude: props.lngLat[1],
    });
  }

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapStyle={Theme}
      onDblClick={ModalOn}
    >
      <div className="themes">
        <button
          className="btn"
          onClick={() => {
            fetch("http://localhost:8080/logout",{
              credentials:'include'
            })
            history.push("/");
          }}
        >
          Logout
        </button>
        <button className="btn" onClick={Suprise}>
          Dark Mode
        </button>
        <button className="btn" onClick={Outdoor}>
          Outdoor Theme
        </button>
      </div>
      {listEntries.map((eachEntry) => (
        <React.Fragment key={eachEntry._id}>
          <Marker
            key={eachEntry._id}
            latitude={eachEntry.latitude}
            longitude={eachEntry.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <img
              onClick={() => togglePopup({ [eachEntry._id]: true })}
              style={{ width: "24px", height: "50px" }}
              src={"mapbox-marker-icon-20px-purple.png"}
              alt="Hi"
            />
          </Marker>
          {showPopup[eachEntry._id] ? (
            <Popup
              latitude={eachEntry.latitude}
              longitude={eachEntry.longitude}
              closeButton={true}
              closeOnClick={false}
              sortByDepth={true}
              onClose={() => togglePopup({})}
              anchor="top"
            >
              <div className="card">
                <h3>{eachEntry.title}</h3>
                <p>{eachEntry.description}</p>
                <p>{eachEntry.comments}</p>
                {eachEntry.image && (
                  <img src={eachEntry.image} alt={eachEntry.title} style={{width:"200px" }}/>
                )}
                <br></br>
                <button
                  type="button"
                  onClick={async () => {
                    await fetch(
                      `http://localhost:8080/api/logs/${eachEntry._id}`,
                      { credentials: "include" }
                    );
                    delete listEntries[eachEntry._id];
                    currentstate(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}

      <div>
        {Modal.ModalState && (
          <Forms
            formvalues={Modal}
            ModalOff={ModalOff}
            successadd={currentstate}
          />
        )}
        {Modal.ModalState && <Backdrop ModalOff={ModalOff} />}
      </div>
    </ReactMapGL>
  );
}
export default LogMap;
