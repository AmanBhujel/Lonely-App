import { useEffect, useState } from "react";

export function DiscreteTimeline({className,predictions}) {
  const [predictionsHistory, setPredictionsHistory] = useState([]);
  const detectionProximityThreshold = 0.6;

  className = className || "";

  useEffect(() => {
    setPredictionsHistory((old) => [...old, predictions]);
  }, [predictions]);

  function flattenDetections(history) {
    const results = [];
    history.forEach((predictions) => {
      predictions.forEach((detection) => {
        if (results.length === 0) {
          results.push(detection);
        } else {
          const lastDetection = results[results.length - 1];
          updateWithTimeout(lastDetection, detection);
          if (shouldMerge(lastDetection, detection)) {
            results[results.length - 1] = mergeDetections(results[results.length - 1], detection);
          } else {
            results.push(detection);
          }
        }
      });
    });
    results.reverse();
    return results;
  }

  function mergeDetections(detectionA, detectionB) {
    const rangeA = detectionA.time;
    const rangeB = detectionB.time;
    const shouldReplaceEmotions = rangeSize(rangeB) < rangeSize(rangeA);

    return {
      time: mergeRanges(detectionA.time, detectionB.time),
      emotions: shouldReplaceEmotions ? detectionB.emotions : detectionA.emotions,
    };
  }

  function mergeRanges(rangeA, rangeB) {
    return {
      begin: rangeA.begin,
      end: rangeB.end,
    };
  }

  function updateWithTimeout(detectionA, detectionB) {
    const timeoutTime = 60;
    const rangeA = detectionA.time;
    const rangeB = detectionB.time;
    if (rangeB.begin < rangeA.begin) {
      rangeB.begin += timeoutTime;
      rangeB.end += timeoutTime;
    }
  }

  function shouldMerge(detectionA, detectionB) {
    const rangeA = detectionA.time;
    const rangeB = detectionB.time;
    return rangesOverlap(rangeA, rangeB) || rangesClose(rangeA, rangeB);
  }

  function rangeSize(range) {
    return range.end - range.begin;
  }

  function rangesClose(rangeA, rangeB) {
    return rangeB.begin < rangeA.end + detectionProximityThreshold;
  }

  function rangesOverlap(rangeA, rangeB) {
    return rangeB.begin < rangeA.end;
  }

  return (
    <div className={`${className}`}>
      {flattenDetections(predictionsHistory).map((detection, i) => (
        <div key={i}>
          <Detection detection={detection} />
        </div>
      ))}
    </div>
  );
}


export function Detection(props) {
  var className = props.className || "";
  var detection = props.detection;
  const sorted = detection.emotions.sort((a, b) => (a.score < b.score ? 1 : -1));
  const topEmotion = sorted[0];

  let time = (detection.time.end - detection.time.begin).toFixed(1);
  if (detection.time.end < detection.time.begin) {
    const timeoutTime = 60;
    time = (detection.time.end + timeoutTime - detection.time.begin).toFixed(1);
  }

  className = className || "";

  return (
    <div>
      <div>
        <span></span>
      </div>
      <div>
        <span>{topEmotion.name}</span>
      </div>
      <div >
        <span>{time}s</span>
      </div>
    </div>
  );
}
