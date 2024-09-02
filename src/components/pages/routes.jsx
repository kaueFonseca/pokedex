import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./home";
import { Detail } from "./Detail";


const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            {}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
);

export { AppRoutes };
