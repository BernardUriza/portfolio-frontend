import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AgentType, ContextInfo } from '../../components/game-chat/game-chat.models';

interface ContextRequest {
  section: string;
  projectId?: string;
  action: string;
  userContext: any;
}

@Injectable({ providedIn: 'root' })
export class ChatContextService {
  private root = `${environment.apiRoot}/chat`;

  constructor(private http: HttpClient) {}

  sendContext(req: ContextRequest): Observable<any> {
    return this.http.post(`${this.root}/context`, req);
  }

  getAgent(type: AgentType): Observable<any> {
    return this.http.get(`${this.root}/agent/${type}`);
  }

  sendMessage(message: string, context: ContextInfo, agent: AgentType): Observable<any> {
    return this.http.post(`${this.root}/message`, { message, context, agent }).pipe(map((r:any)=>r));
  }
}
