import './studio-atmosphere.css';

export default function StudioAtmosphere() {
  return <div className="studio-atmosphere" aria-hidden="true">
    <div className="studio-atmosphere-light" />
    <svg className="studio-atmosphere-landscape" viewBox="0 0 1440 680" preserveAspectRatio="none" focusable="false">
      <path className="studio-mountain-far" d="M0 360C110 340 151 282 230 305S355 374 450 302 540 208 622 248 730 318 809 245 900 134 983 183 1075 263 1150 202 1270 133 1440 220V680H0Z" />
      <path className="studio-mountain-near" d="M0 455C143 386 238 456 360 378S503 349 610 381 740 346 838 306 966 334 1058 309 1218 247 1325 302 1400 322 1440 307V680H0Z" />
      <g className="studio-water-lines" fill="none" strokeWidth="1">
        <path d="M390 479H625M1070 452H1400M454 511H719M1100 495H1440M650 550H969M1040 572H1304M256 573H502" />
      </g>
    </svg>
    <div className="studio-atmosphere-ground" />
  </div>;
}
