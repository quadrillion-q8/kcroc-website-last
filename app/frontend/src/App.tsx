// Inside your App.tsx
<BrowserRouter>
  <Header /> {/* This Header will now appear consistently on ALL pages */}
  <main>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookingPage />} />
        {/* ... all your other routes */}
      </Routes>
    </Suspense>
  </main>
</BrowserRouter>
