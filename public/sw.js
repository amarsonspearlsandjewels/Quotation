// Service Worker for PWA notifications
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim());
});

// Handle background sync for downloads
self.addEventListener('sync', (event) => {
  if (event.tag === 'pdf-download') {
    event.waitUntil(handlePDFDownload());
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  
  const options = {
    body: data.body || 'PDF downloaded successfully!',
    icon: '/applogo.png',
    badge: '/applogo.png',
    vibrate: [100, 50, 100],
    data: {
      filename: data.filename,
      objectUrl: data.objectUrl,
      timestamp: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'open',
        title: 'Open File',
        icon: '/applogo.png'
      },
      {
        action: 'share',
        title: 'Share',
        icon: '/applogo.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/applogo.png'
      }
    ],
    requireInteraction: false,
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification('PDF Download Complete', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    // Try to open the file or focus the app
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        // Focus existing window if available
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            return client.focus().then(() => {
              // Send message to client to open file
              client.postMessage({
                type: 'OPEN_PDF',
                filename: event.notification.data.filename,
                objectUrl: event.notification.data.objectUrl
              });
            });
          }
        }
        
        // Open new window if no existing window
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  } else if (event.action === 'share') {
    // Handle share action
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(self.location.origin)) {
            client.postMessage({
              type: 'SHARE_PDF',
              filename: event.notification.data.filename
            });
            return client.focus();
          }
        }
      })
    );
  } else {
    // Default action: focus the app
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});

// Handle messages from main app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PDF_DOWNLOADED') {
    // Show notification for PDF download
    const options = {
      body: `File "${event.data.filename}" downloaded successfully!`,
      icon: '/applogo.png',
      badge: '/applogo.png',
      vibrate: [100, 50, 100],
      data: {
        filename: event.data.filename,
        objectUrl: event.data.objectUrl,
        timestamp: Date.now()
      },
      actions: [
        {
          action: 'open',
          title: 'Open File',
          icon: '/applogo.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/applogo.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification('PDF Download Complete', options)
    );
  }
});

async function handlePDFDownload() {
  // Background sync logic for PDF downloads
  console.log('Handling PDF download in background');
} 