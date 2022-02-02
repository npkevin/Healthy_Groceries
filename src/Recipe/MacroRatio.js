import React, { useRef, useEffect, useState } from "react"

const MacroRatio = (props) => {
  const total = props.ratio.f + props.ratio.c + props.ratio.p;
  const multiplier_f = props.ratio.f / total
  const multiplier_c = props.ratio.c / total
  const multiplier_p = props.ratio.p / total

  const [width_f, setWidthF] = useState(0);
  const [width_c, setWidthC] = useState(0);
  const [width_p, setWidthP] = useState(0);

  const ref = useRef();
  useEffect(() => {
    setWidthF(ref.current.offsetWidth * multiplier_f)
    setWidthC(ref.current.offsetWidth * multiplier_c)
    setWidthP(ref.current.offsetWidth * multiplier_p)
  }, [total, multiplier_f, multiplier_c, multiplier_p]);

  return (
    <div ref={ref} className="macroRatio">
      <div className="macroRatio__f" style={{ flexGrow: width_f }}></div>
      <div className="macroRatio__p" style={{ flexGrow: width_p }}></div>
      <div className="macroRatio__c" style={{ flexGrow: width_c }}></div>
    </div>
  )
}


export default MacroRatio