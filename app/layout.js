import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Employee JS App",
  description: "Client Project - Personal & Company Info System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}