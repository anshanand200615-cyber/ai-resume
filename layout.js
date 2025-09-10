// app/layout.js
export const metadata = {
  title: "AI Resume Generator",
  description: "Generate resumes instantly with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
