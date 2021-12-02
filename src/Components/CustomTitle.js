
export default function CustomTitle(props) {
  //other logic
  return (
    <div style={{ marginTop: '25px', marginBottom: '25px', display:"flex", justifyContent:"center" }}>
        <h2 style={{ margin: '5px', color: '#178be7', fontWeight: '600' }}>
            {props.title}
        </h2>
    </div>
);
}