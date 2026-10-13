'use client';

import { accentInitScript } from '@/lib/accent';

// сохранённый главный цвет — до первой отрисовки, иначе мелькает цвет по умолчанию.
// Скрипт выполняется из HTML сервера. Если React перерисует корень на клиенте,
// он создаст <script> заново и предупредит, что тот не выполнится, — поэтому
// на клиенте даём type='text/plain': для React это блок данных, предупреждения нет.
// suppressHydrationWarning — из-за разного type на сервере и клиенте.
export default function AccentInitScript() {
	return (
		<script
			type={typeof window === 'undefined' ? undefined : 'text/plain'}
			dangerouslySetInnerHTML={{ __html: accentInitScript }}
			suppressHydrationWarning
		/>
	);
}
