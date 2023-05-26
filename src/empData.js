import './App.css';

// employee data table
// you might receive from an API
const empdata = [
{ empid: "001" ,name: "Arun", age: 21, email: "arun@gmail.com", gender: "Male" },
{ empid: "002" ,name: "Megha", age: 26, email :"mega@gmail.com",  gender: "Female" },
{ empid: "003" ,name: "Subha", age: 25, email: "subha@gmail.com" , gender: "Female"},
{ empid: "004" ,name: "Malar", age: 24, email: "subha@gmail.com" , gender: "Female"},
{ empid: "005" ,name: "Tarun", age: 23, email: "tarun@gmail.com" , gender: "Male"}
]

function App() {
return (
	<div className="App">
	<table>
		<tr>
        <th> Employee Id</th>
		<th>Name</th>
		<th>Age</th>
        <th>Email Id</th>
		<th>Gender</th>
		</tr>
		{empdata.map((value, key) => {
		return (
			<tr key={key}>
            <td>{value.empid}</td>
			<td>{value.name}</td>
			<td>{value.age}</td>
            <td>{value.email}</td>
			<td>{value.gender}</td>
			</tr>
		)
		})}
	</table>
	</div>
);
}

export default App;
