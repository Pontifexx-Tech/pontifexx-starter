import { Head } from '@inertiajs/react';
import { useChat } from 'ai/react';
import { Bot, Send, User, Loader2, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'AI Chat',
        href: '/ai-chat',
    },
];

export default function AIChat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } =
        useChat({
            api: '/api/chat',
        });

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="AI Chat" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card className="flex flex-1 flex-col">
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Bot className="h-5 w-5" />
                                AI Assistent
                            </CardTitle>
                            <CardDescription>
                                Chat met de Pontifexx AI Assistent powered by
                                NeuronAI
                            </CardDescription>
                        </div>
                        {messages.length > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearChat}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Wissen
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col">
                        <ScrollArea className="flex-1 pr-4">
                            <div className="space-y-4 pb-4">
                                {messages.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <Bot className="text-muted-foreground mb-4 h-12 w-12" />
                                        <h3 className="mb-2 text-lg font-medium">
                                            Welkom bij de AI Assistent
                                        </h3>
                                        <p className="text-muted-foreground max-w-sm text-sm">
                                            Stel een vraag om te beginnen. Ik kan
                                            je helpen met vragen over Laravel,
                                            React, de starter kit, en meer.
                                        </p>
                                        <div className="mt-6 flex flex-wrap justify-center gap-2">
                                            <SuggestionButton
                                                onClick={() => {
                                                    const event = {
                                                        target: { value: 'Hallo, wie ben jij?' },
                                                    } as React.ChangeEvent<HTMLInputElement>;
                                                    handleInputChange(event);
                                                }}
                                            >
                                                Hallo, wie ben jij?
                                            </SuggestionButton>
                                            <SuggestionButton
                                                onClick={() => {
                                                    const event = {
                                                        target: { value: 'Wat kan deze starter kit?' },
                                                    } as React.ChangeEvent<HTMLInputElement>;
                                                    handleInputChange(event);
                                                }}
                                            >
                                                Wat kan deze starter kit?
                                            </SuggestionButton>
                                            <SuggestionButton
                                                onClick={() => {
                                                    const event = {
                                                        target: { value: 'Help me met Laravel' },
                                                    } as React.ChangeEvent<HTMLInputElement>;
                                                    handleInputChange(event);
                                                }}
                                            >
                                                Help me met Laravel
                                            </SuggestionButton>
                                        </div>
                                    </div>
                                )}
                                {messages.map((message) => (
                                    <ChatMessage
                                        key={message.id}
                                        role={message.role}
                                        content={message.content}
                                    />
                                ))}
                                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                <Bot className="h-4 w-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="bg-muted flex items-center gap-2 rounded-lg px-4 py-3">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span className="text-muted-foreground text-sm">
                                                Aan het typen...
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-4 flex gap-2"
                        >
                            <Input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Typ je bericht..."
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button type="submit" disabled={isLoading || !input.trim()}>
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                                <span className="sr-only">Verstuur</span>
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

function ChatMessage({ role, content }: { role: string; content: string }) {
    const isUser = role === 'user';

    return (
        <div
            className={cn(
                'flex items-start gap-3',
                isUser && 'flex-row-reverse'
            )}
        >
            <Avatar className="h-8 w-8">
                <AvatarFallback
                    className={cn(
                        isUser
                            ? 'bg-secondary text-secondary-foreground'
                            : 'bg-primary text-primary-foreground'
                    )}
                >
                    {isUser ? (
                        <User className="h-4 w-4" />
                    ) : (
                        <Bot className="h-4 w-4" />
                    )}
                </AvatarFallback>
            </Avatar>
            <div
                className={cn(
                    'max-w-[80%] rounded-lg px-4 py-3',
                    isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                )}
            >
                <p className="whitespace-pre-wrap text-sm">{content}</p>
            </div>
        </div>
    );
}

function SuggestionButton({
    children,
    onClick,
}: {
    children: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="border-input hover:bg-accent hover:text-accent-foreground rounded-full border px-3 py-1.5 text-sm transition-colors"
        >
            {children}
        </button>
    );
}
