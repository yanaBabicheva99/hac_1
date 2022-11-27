import React, { FC, useState } from "react";
import "./Questions.css";
import { Button, Card, Checkbox, Space } from "antd";
import { questionI } from "./SingleQuestion";
import ImageMarker, { Marker } from "react-image-marker";
import image1 from "../../test.jpg";

export const ImageQuestion: FC<questionI> = () => {
  const [markers, setMarkers] = useState([
    {
      top: 10,
      left: 50,
    },
  ]);

  return (
    <div className={"multi-wrapper"}>
      <Card title={`task.title`}>
        <div className={"multiq-card"}>
          <p>{`task.body`}</p>
          <ImageMarker
            src={image1}
            markers={markers}
            onAddMarker={(marker: Marker) =>
              setMarkers([...(markers as any), marker])
            }
          />
          <Button style={{ marginTop: "5px" }}>Подтвердить</Button>
        </div>
      </Card>
    </div>
  );
};
