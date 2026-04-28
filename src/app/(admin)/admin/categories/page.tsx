'use client';

import { SORT_ORDER } from '@/common/enums';
import { setOrder } from '@/common/helpers';
import useModalStore from '@/common/hooks/use-modal';
import { CategoriesTable } from '@/modules/category/components/categories-table';
import CategoryFilter from '@/modules/category/components/category-filter';
import CategoryModalForm from '@/modules/category/components/category-modal-form';
import { CategoryModalType } from '@/modules/category/enums';
import { useCategories } from '@/modules/category/hooks/use-categories';
import { CategoryFilter as CategoryFilterType } from '@/modules/category/types/category-types';
import { PageContainer } from '@ant-design/pro-components';
import { Pagination } from 'antd';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

export default function CategoriesPage() {
    const [params, setParams] = useQueryStates({
        page: parseAsInteger.withDefault(1),
        pageSize: parseAsInteger.withDefault(20),
        sortField: parseAsString,
        sortOrder: parseAsString,
        keyword: parseAsString,
    });

    const { categories, isFetching } = useCategories(
        params as CategoryFilterType
    );
    const typeModal = useModalStore((s) => s.typeModal);
    const closeModal = useModalStore((s) => s.closeModal);
    const openModal = useModalStore((s) => s.openModal);

    const isModalOpen =
        typeModal === CategoryModalType.CATEGORY_CREATE ||
        typeModal === CategoryModalType.CATEGORY_UPDATE;

    const onSort = (_pagination: any, _filters: any, sorter: any) => {
        const orderField = sorter.field;
        const order = setOrder(sorter, SORT_ORDER.ASC);

        setParams({
            sortField: orderField,
            sortOrder: order,
        });
    };

    return (
        <PageContainer
            header={{
                title: 'Category Management',
                subTitle: 'Manage categories for your posts',
            }}
        >
            <CategoryFilter
                params={{
                    keyword: params.keyword,
                }}
                onFilter={(values: any) =>
                    setParams({
                        keyword: values.keyword || null,
                        page: 1,
                    })
                }
            />

            <CategoriesTable
                dataSource={categories?.items || []}
                loading={isFetching}
                pagination={{
                    pageSize: params.pageSize,
                    current: params.page,
                }}
                sortField={params.sortField}
                sortOrder={params.sortOrder}
                onCreate={() =>
                    openModal(CategoryModalType.CATEGORY_CREATE)
                }
                onChange={onSort}
            />

            <Pagination
                style={{ background: 'white', padding: '0 12px 12px' }}
                align="end"
                showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                }
                total={categories?.metadata?.totalItems}
                current={params.page}
                pageSize={params.pageSize}
                onChange={(page, pageSize) => {
                    setParams({ page, pageSize });
                }}
            />

            <CategoryModalForm open={isModalOpen} onCancel={closeModal} />
        </PageContainer>
    );
}
