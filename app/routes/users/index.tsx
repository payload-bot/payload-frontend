import * as React from "react";

export default function User() {
  return (
    <div>
      <form action="/logout" method="post">
        <button>logout</button>
      </form>
    </div>
  );
}
