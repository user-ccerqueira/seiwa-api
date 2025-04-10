import AuthRoutes from './auth';
import MedicalRoutes from './medical-procedures';
import DashboardsRoutes from './dashboards';

export default (passport) => ({
  AuthRoutes: AuthRoutes(passport),
  MedicalRoutes: MedicalRoutes(passport),
  DashboardsRoutes: DashboardsRoutes(passport),
});
