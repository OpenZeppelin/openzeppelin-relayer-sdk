# NotificationsApi

All URIs are relative to _http://localhost_

| Method                                                           | HTTP request                                       | Description                                         |
| ---------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------- |
| [**createNotification**](NotificationsApi.md#createNotification) | **POST** /api/v1/notifications                     | Creates a new notification.                         |
| [**deleteNotification**](NotificationsApi.md#deleteNotification) | **DELETE** /api/v1/notifications/{notification_id} | Deletes a notification by ID.                       |
| [**getNotification**](NotificationsApi.md#getNotification)       | **GET** /api/v1/notifications/{notification_id}    | Retrieves details of a specific notification by ID. |
| [**listNotifications**](NotificationsApi.md#listNotifications)   | **GET** /api/v1/notifications                      | Notification routes implementation                  |
| [**updateNotification**](NotificationsApi.md#updateNotification) | **PATCH** /api/v1/notifications/{notification_id}  | Updates an existing notification.                   |

<a name="createNotification"></a>

# **createNotification**

> ApiResponse_NotificationResponse createNotification(NotificationCreateRequest)

Creates a new notification.

### Parameters

| Name                          | Type                                                                    | Description | Notes |
| ----------------------------- | ----------------------------------------------------------------------- | ----------- | ----- |
| **NotificationCreateRequest** | [**NotificationCreateRequest**](../Models/NotificationCreateRequest.md) |             |       |

### Return type

[**ApiResponse_NotificationResponse**](../Models/ApiResponse_NotificationResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="deleteNotification"></a>

# **deleteNotification**

> ApiResponse_String deleteNotification(notification_id)

Deletes a notification by ID.

### Parameters

| Name                | Type       | Description     | Notes             |
| ------------------- | ---------- | --------------- | ----------------- |
| **notification_id** | **String** | Notification ID | [default to null] |

### Return type

[**ApiResponse_String**](../Models/ApiResponse_String.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getNotification"></a>

# **getNotification**

> ApiResponse_NotificationResponse getNotification(notification_id)

Retrieves details of a specific notification by ID.

### Parameters

| Name                | Type       | Description     | Notes             |
| ------------------- | ---------- | --------------- | ----------------- |
| **notification_id** | **String** | Notification ID | [default to null] |

### Return type

[**ApiResponse_NotificationResponse**](../Models/ApiResponse_NotificationResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="listNotifications"></a>

# **listNotifications**

> ApiResponse_Vec_NotificationResponse listNotifications(page, per_page)

Notification routes implementation

    Note: OpenAPI documentation for these endpoints can be found in the &#x60;openapi.rs&#x60; file  Lists all notifications with pagination support.

### Parameters

| Name         | Type        | Description                              | Notes                        |
| ------------ | ----------- | ---------------------------------------- | ---------------------------- |
| **page**     | **Integer** | Page number for pagination (starts at 1) | [optional] [default to null] |
| **per_page** | **Integer** | Number of items per page (default: 10)   | [optional] [default to null] |

### Return type

[**ApiResponse_Vec_NotificationResponse**](../Models/ApiResponse_Vec_NotificationResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="updateNotification"></a>

# **updateNotification**

> ApiResponse_NotificationResponse updateNotification(notification_id, NotificationUpdateRequest)

Updates an existing notification.

### Parameters

| Name                          | Type                                                                    | Description     | Notes             |
| ----------------------------- | ----------------------------------------------------------------------- | --------------- | ----------------- |
| **notification_id**           | **String**                                                              | Notification ID | [default to null] |
| **NotificationUpdateRequest** | [**NotificationUpdateRequest**](../Models/NotificationUpdateRequest.md) |                 |                   |

### Return type

[**ApiResponse_NotificationResponse**](../Models/ApiResponse_NotificationResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json
