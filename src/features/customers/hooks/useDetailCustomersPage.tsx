import { useDeleteCustomerMutation, useGetCustomersByIdQuery } from '@/share/api/customersApi';

type Props = {
    customerId: number;
    onDelete?: () => void;
};

export function useDetailCustomersPage({ customerId, onDelete }: Props) {
    const { data: customer, isLoading: isCustomerLoading, error: customerError, } = useGetCustomersByIdQuery(customerId, {
        skip: customerId == null,
    });
    const [deleteCustomer, { isLoading: isDeleting }] = useDeleteCustomerMutation();

    const handleDelete = async () => {
        if (customer && confirm('Вы действительно хотите удалить эту задачу?')) {
            onDelete?.();
            try {
                await deleteCustomer(customer.id).unwrap();
                alert('Задача удалена');
            } catch (error) {
                alert('Ошибка при удалении задачи');
                console.error(error);
            }
        }
    };

    return {
        customer,
        isCustomerLoading,
        isDeleting,
        customerError,
        handleDelete,
    };
}