export const ClearSession = () => {
    localStorage.removeItem("tokenCYLTour");
    localStorage.removeItem("rol_id");
    localStorage.removeItem("user_id");
};
