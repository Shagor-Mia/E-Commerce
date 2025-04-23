const loggedInUsers = [
  {
    userName: "Sunny",
    email: "sunny1@gmail.com",
    role: "admin",
  },
  {
    userName: "Funny",
    email: "funny1@gmail.com",
    role: "user",
  },
];

function LoggedInUsersForAdmin() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Logged-in Users</h1>
      {loggedInUsers && loggedInUsers.length > 0 ? (
        <ul className="space-y-2">
          {loggedInUsers.map((user, index) => (
            <li
              key={`${user.userName}-${user.email}-${index}`} // Unique key
              className="p-2 border rounded shadow-sm flex justify-between"
            >
              <span>{user.userName}</span>
              <span>{user.email}</span>
              <span>{user.role}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users are currently logged in.</p>
      )}
    </div>
  );
}

export default LoggedInUsersForAdmin;
