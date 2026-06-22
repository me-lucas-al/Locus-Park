import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Historico } from './pages/historico/historico';
import { Entrada } from './pages/entrada/entrada';
import { Saida } from './pages/saida/saida';
import { Relatorios } from './pages/relatorios/relatorios';
import { Login } from './pages/auth/login/login';
import { Cadastro } from './pages/auth/cadastro/cadastro';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'entrada', component: Entrada },
  { path: 'saida', component: Saida },
  { path: 'historico', component: Historico },
  { path: 'relatorios', component: Relatorios },
  /*   { path: 'controle-vagas', component: ControleVagas }, */
  { path: '**', redirectTo: 'login' }
];