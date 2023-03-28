/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
import { useQueryClient } from '@tanstack/react-query'
import type { ColumnsType } from 'antd/es/table'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button, Input, Modal, Textarea, Toggle } from 'posy-fnb-core'
import React, { useState } from 'react'
import { FormProvider, useFieldArray } from 'react-hook-form'

import InputSearch from '@/atoms/input/search'
import Select from '@/atoms/input/select'
import Table from '@/atoms/table'
import { GetOutletProductsQueryKey } from '@/data/product/sources/GetOutletProductsQuery'
import { Product } from '@/domain/product/model'
import { UpdateOutletProductStatusInput } from '@/domain/product/repositories/ProductRepository'
import useDisclosure from '@/hooks/useDisclosure'
import { useForm } from '@/hooks/useForm'
import { validationSchemaProduct } from '@/schemas/product'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { onChangeProductId } from '@/store/slices/product'
import { toRupiah } from '@/utils/common'
import { onChangeQueryParams } from '@/utils/UtilsChangeQueryParams'
import { useGetOutletProductsViewModel } from '@/view/product/view-models/GetOutletProductsViewModel'
import { useUpdateOutletProductStatusViewModel } from '@/view/product/view-models/UpdateOutletProductStatusViewModel'

import VariantTemp from './VariantTemp'

const columns = (
  updateOutletProductStatus: (input: UpdateOutletProductStatusInput) => void,
  restaurant_outlet_uuid: string,
): ColumnsType<Product> => [
  {
    title: 'Product name',
    dataIndex: 'product_name',
    key: 'product_name',
    fixed: 'left',
    width: '320px',
    render: (text) => <p className="line-clamp-1">{text}</p>,
  },
  {
    title: 'Category',
    dataIndex: 'categories',
    key: 'category',
    width: '100px',
    render: (text) => (
      <p className="truncate">
        {text
          .map((el: { category_name: string }) => el.category_name)
          .join(', ')}
      </p>
    ),
  },
  {
    title: (
      <p className="flex justify-center whitespace-nowrap">Selling price</p>
    ),
    dataIndex: 'price',
    key: 'price_final',
    width: '118px',
    align: 'center',
    render: (text) => (
      <p className="whitespace-nowrap text-m-regular">{toRupiah(text)}</p>
    ),
  },

  {
    align: 'center',
    title: <p className="whitespace-nowrap">Show product</p>,
    dataIndex: 'is_show',
    key: 'is_show',
    width: '128px',
    render: (val, record) => (
      <div className="flex items-center justify-center">
        <Toggle
          value={val}
          onChange={() =>
            updateOutletProductStatus({
              flag: !val,
              restaurant_outlet_uuid,
              status: 'is_show',
              product_uuids: [record.uuid],
            })
          }
        />
      </div>
    ),
  },
  {
    align: 'center',
    title: <p className="whitespace-nowrap">Product available</p>,
    dataIndex: 'is_available',
    key: 'is_available',
    width: '135px',
    render: (val, record) => (
      <div className="flex items-center justify-center">
        <Toggle
          value={val}
          onChange={() =>
            updateOutletProductStatus({
              flag: !val,
              restaurant_outlet_uuid,
              status: 'is_available',
              product_uuids: [record.uuid],
            })
          }
        />
      </div>
    ),
  },

  // {
  //   align: 'center',
  //   title: (
  //     <p
  //       role="presentation"
  //       onClick={() => console.log('tes')}
  //       className="cursor-pointer whitespace-nowrap hover:opacity-70"
  //     >
  //       +
  //     </p>
  //   ),
  //   key: 'edit',
  //   width: '60px',
  //   fixed: 'right',
  //   render: () => (
  //     <div className="flex items-center justify-center">
  //       {/* <BiEdit
  //         size={18}
  //         className="cursor-pointer text-neutral-70 hover:opacity-70"
  //       /> */}
  //     </div>
  //   ),
  // },
]

const PagesTransaction = () => {
  const { query } = useRouter()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [
    isOpenEditProduct,
    { open: openEditProduct, close: closeEditProduct },
  ] = useDisclosure({ initialState: false })
  const { outletId } = useAppSelector((state) => state.auth)

  const {
    data: dataProduct,
    pagination,
    isLoading: loadProduct,
  } = useGetOutletProductsViewModel({
    limit: Number(query.limit) || 10,
    page: Number(query.page) || 1,
    search: [
      {
        field: 'keyword',
        value: (query.search as string) || '',
      },
      {
        field: 'restaurant_outlet_uuid',
        value: outletId,
      },
    ],
    sort: { field: 'created_at', value: 'desc' },
  })

  const { updateOutletProductStatus } = useUpdateOutletProductStatusViewModel({
    onSuccess: () => queryClient.invalidateQueries([GetOutletProductsQueryKey]),
  })

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const onOpenEditProduct = (product_uuid: string) => {
    openEditProduct()
    dispatch(onChangeProductId(product_uuid))
  }

  const onCloseEditProduct = () => {
    closeEditProduct()
    dispatch(onChangeProductId(''))
  }

  const methods = useForm({ schema: validationSchemaProduct })
  const {
    control,
    formState: { errors },
  } = methods

  const { fields, append } = useFieldArray({
    control,
    name: 'addon',
  })

  const onSubmit = () => {
    // console.log(e, 'data')
  }

  const actionOptions = (length: number) => [
    {
      label: `Selected ${length} ${length === 1 ? 'item' : 'items'}`,
      value: '',
    },
    { label: 'Mark as shown', value: 'is_show' },
    { label: 'Mark as available', value: 'is_available' },
  ]

  const categoryOptions = [
    { label: 'Select Category', value: '', hide: true },
    { label: 'Category: All', value: 'all' },
    { label: 'Category: Food', value: 'food' },
    { label: 'Category: Beverages', value: 'beverages' },
    { label: 'Category: Desserts', value: 'desserts' },
  ]

  const handleChangeRowAction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateOutletProductStatus({
      flag: true,
      restaurant_outlet_uuid: outletId,
      status: e.currentTarget.value as 'is_show' | 'is_available',
      product_uuids: selectedRowKeys as string[],
    })
    setSelectedRowKeys([])
  }

  return (
    <main className="h-full flex-1 overflow-hidden rounded-l-2xl bg-neutral-10 p-6">
      <article>
        <aside className="flex items-start">
          <p className="text-xxl-semibold text-primary-main lg:text-heading-s-semibold">
            Product
          </p>
        </aside>
        <aside className="mt-4">
          <div className="mt-1 flex items-center space-x-4">
            {rowSelection.selectedRowKeys.length > 0 && (
              <Select
                options={actionOptions(rowSelection.selectedRowKeys.length)}
                onChange={handleChangeRowAction}
              />
            )}
            <Select
              options={categoryOptions}
              onChange={(e) =>
                onChangeQueryParams('category', e.currentTarget.value)
              }
              defaultValue={query.category as string}
            />
            <div className="flex w-1/2 items-center lg:w-1/4">
              <InputSearch
                placeholder="Search Product"
                isOpen
                search={(query.search as string) || ''}
                onSearch={(e) => onChangeQueryParams('search', e.target.value)}
                onClearSearch={() => onChangeQueryParams('search', '')}
              />
            </div>
          </div>
        </aside>
      </article>

      <article className="mt-6">
        <Table
          onRow={(record) => ({
            onClick: () => onOpenEditProduct(record.uuid),
          })}
          columns={columns(updateOutletProductStatus, outletId)}
          dataSource={dataProduct}
          paginationData={pagination}
          rowKey={(record) => record.uuid}
          rowSelection={rowSelection}
          scroll={{ y: '54vh', x: 1100 }}
          loading={loadProduct}
        />
      </article>

      {isOpenEditProduct && (
        <Modal
          className="!p-0"
          isForm
          handleSubmit={methods.handleSubmit(onSubmit)}
          showCloseButton
          open={isOpenEditProduct}
          handleClose={onCloseEditProduct}
          confirmButton={
            <div className="flex w-full items-center justify-center gap-4">
              <Button variant="secondary" type="submit" fullWidth>
                Save
              </Button>
            </div>
          }
        >
          <FormProvider {...methods}>
            <div className="px-6 py-4">
              <aside className="flex gap-6">
                <div>
                  <Image
                    src="/images/logo.png"
                    alt="product image"
                    width={142}
                    height={142}
                  />
                </div>

                <div className="flex-1">
                  <div>
                    <Input
                      fullwidth
                      labelText="Product Name"
                      {...methods.register('product_name')}
                      error={!!errors?.product_name}
                      helperText={errors?.product_name?.message}
                    />
                  </div>
                  <div className="mt-4">
                    <Input fullwidth labelText="Category" />
                  </div>
                </div>
              </aside>
              <aside className="mt-6">
                <div>
                  <Input labelText="Price" />
                </div>
              </aside>

              <aside className="mt-6 grid grid-cols-3 gap-6">
                <div>
                  <p className="mb-4">Activate Discount</p>
                  <Toggle value onChange={() => undefined} />
                </div>
                <div>
                  <Input labelText="Discount (%)" />
                </div>
                <div>
                  <Input labelText="Price after discount" />
                </div>
              </aside>

              <aside className="mt-6">
                <Textarea labelText="Description" />
              </aside>

              <aside className="mt-6 border-b-2 border-b-neutral-30 pb-6">
                <div className="text-l-semibold">View setup</div>
                <aside className="mt-6 grid grid-cols-3 gap-6">
                  <div>
                    <p className="mb-4">Activate Discount</p>
                    <Toggle value onChange={() => undefined} />
                  </div>
                  <div>
                    <p className="mb-4">Product Available</p>
                    <Toggle value onChange={() => undefined} />
                  </div>
                  <div>
                    <p className="mb-4">Recommendation</p>
                    <Toggle value onChange={() => undefined} />
                  </div>
                </aside>
              </aside>

              {/* {product.addon?.map((addon, addonIdx) => ( */}
              {fields.map((addon, addonIdx) => (
                <aside key={addon.id} className="mt-6">
                  <div className="flex items-center justify-between text-l-semibold">
                    Add on details
                    {/* <CgTrash
                  className="cursor-pointer text-neutral-70"
                  size={20}
                  onClick={handleDeleteAddOn}
                /> */}
                  </div>
                  <div className="mt-6">
                    <Input
                      labelText="Addon name"
                      {...methods.register(`addon.${addonIdx}.addon_name`)}
                      error={
                        errors?.addon && !!errors?.addon[addonIdx]?.addon_name
                      }
                      helperText={
                        errors?.addon &&
                        errors?.addon[addonIdx]?.addon_name?.message
                      }
                    />
                  </div>
                  <aside className="mt-6 grid grid-cols-3 gap-6">
                    <div>
                      <p className="mb-4">Required</p>
                      <Toggle value onChange={() => undefined} />
                    </div>
                    <div>
                      <p className="mb-4">Choose multiple</p>
                      <Toggle value onChange={() => undefined} />
                    </div>
                  </aside>

                  <VariantTemp addonIdx={addonIdx} errors={errors} />
                </aside>
              ))}

              <aside className="mt-6 flex items-center justify-center ">
                <p
                  role="presentation"
                  // onClick={handleAddAddOn}
                  onClick={() =>
                    append({
                      addon_name: '',
                      addon_variants: [
                        {
                          variant_name: '',
                          variant_price: '',
                        },
                      ],
                    })
                  }
                  className="cursor-pointer text-l-semibold text-secondary-main hover:opacity-70"
                >
                  + Add addon
                </p>
              </aside>
            </div>
          </FormProvider>
        </Modal>
      )}
    </main>
  )
}

export default PagesTransaction
