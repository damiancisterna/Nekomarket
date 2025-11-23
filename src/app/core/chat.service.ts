import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage {
  id?: number;
  senderId: number;
  receiverId: number;
  productId: string;
  productName: string;
  content: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/messages';

  sendMessage(msg: ChatMessage): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(this.apiUrl, msg);
  }

  // opcional: mensajes del vendedor
  getMessagesForSeller(sellerId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}?receiverId=${sellerId}`);
  }
}
