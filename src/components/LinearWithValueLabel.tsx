import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; maxValue: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const LinearWithValueLabel = () => {
  const maxValue = 800; // max value of the progress bar
  const [progress, setProgress] = useState(0);

  const data = [...Array.from(Array(maxValue).keys())];

  useEffect(() => {
    const count = async () => {
      let percentage10 =
        maxValue >= 10 ? (maxValue > 1000 ? 100 : maxValue * 0.1) : 1; // 10% of the max value
      for (let i = 1; i <= data.length; i + percentage10) {
        // loop through the data array
        const sendData = data.splice(0, percentage10); // remove the first 10% elements
        setProgress((prev) => prev + sendData.length); // increase the progress by 10%
        await delay(1000); // wait 1 second
      }
    };
    count();
  }, []);

  return (
    <LinearProgressWithLabel
      value={(100 * progress) / maxValue} // calculate the progress
      maxValue={maxValue}
    />
  );
};

export default LinearWithValueLabel;
