# Custom Components

The default components contain very little behavior outside of simply being displayed. Implementing things such as `onClick` handlers or selection is entirely up to the end user. While the Default components can be restyled, the approach _we recommend is creating custom components for the display and actions that your project requires_.

The default components aren't really extensible. For example, the default event component onClick handler just prints the event data in to the console. As a consumer, you would extend the `EventComponent` interface to implement your own Event component that has the behavior you require.

All default components have interfaces available, and custom components can be passed in via the `schedulelyComponents` property.

Care should be taken when styling custom components. The underlying calendar layout is flexible, but it can still be easily broken.
