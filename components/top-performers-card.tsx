export default function TopPerformersCard({students}: {students:any[]}){
    return(
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.total_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

};