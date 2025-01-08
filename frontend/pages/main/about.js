// pages/main/about.js

import Link from "next/link";

export default function About() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>About Us</h1>
      <p>This is the About page under the /main path!</p>
      <Link href="/main" style={{ color: "blue", textDecoration: "underline" }}>
        Back to Home
      </Link>
    </div>
  );
}
