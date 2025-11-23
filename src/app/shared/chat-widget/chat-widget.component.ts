import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { ChatService, ChatMessage } from '../../core/chat.service';
import { Product } from '../../core/models';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: '../chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss'],
})
export class ChatWidgetComponent {
  private auth = inject(AuthService);
  private chatService = inject(ChatService);

  @Input({ required: true }) product!: Product;

  isOpen = signal(false);
  isSending = signal(false);
  successMessage = signal('');
  messageText = '';

  toggle() {
    if (!this.auth.isLoggedIn) {
      alert('Debes iniciar sesión para chatear');
      return;
    }
    this.isOpen.update(v => !v);
    this.successMessage.set('');
  }

  send() {
    if (!this.messageText.trim()) return;

    this.isSending.set(true);

    const msg: ChatMessage = {
      senderId: this.auth.user!.id,
      receiverId: 1, // prototipo: asumimos vendedor ID=1
      productId: this.product.id,
      productName: this.product.name,
      content: this.messageText,
      timestamp: new Date().toISOString(),
    };

    this.chatService.sendMessage(msg).subscribe({
      next: () => {
        this.messageText = '';
        this.isSending.set(false);
        this.successMessage.set('✅ Mensaje enviado al vendedor');
        setTimeout(() => {
          this.isOpen.set(false);
          this.successMessage.set('');
        }, 2000);
      },
      error: () => {
        this.isSending.set(false);
        alert('Error al enviar mensaje');
      },
    });
  }
}
